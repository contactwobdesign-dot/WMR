-- =============================================================================
-- WMR - Module Conformité Loi Influenceurs 2023
-- Migration : profiles (KYC), clients (marques), deals (collaborations), RLS
-- Exécution : idempotente (vérifications IF NOT EXISTS / DO blocks)
-- Prérequis : La table public.profiles doit exister avec une colonne id (uuid).
--             En général profiles.id = auth.users.id (créé par trigger Supabase).
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. MODIFIER LA TABLE public.profiles (colonnes KYC / identité légale)
-- -----------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'legal_name') THEN
    ALTER TABLE public.profiles ADD COLUMN legal_name text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'siret') THEN
    ALTER TABLE public.profiles ADD COLUMN siret text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'address_fiscal') THEN
    ALTER TABLE public.profiles ADD COLUMN address_fiscal text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'is_vat_payer') THEN
    ALTER TABLE public.profiles ADD COLUMN is_vat_payer boolean DEFAULT false;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'vat_number') THEN
    ALTER TABLE public.profiles ADD COLUMN vat_number text;
  END IF;
END $$;

COMMENT ON COLUMN public.profiles.legal_name IS 'Raison sociale ou nom complet officiel (KYC)';
COMMENT ON COLUMN public.profiles.siret IS 'Numéro SIRET (14 chiffres)';
COMMENT ON COLUMN public.profiles.address_fiscal IS 'Adresse complète de facturation';
COMMENT ON COLUMN public.profiles.is_vat_payer IS 'Assujetti à la TVA';
COMMENT ON COLUMN public.profiles.vat_number IS 'Numéro de TVA Intracommunautaire (optionnel)';

-- -----------------------------------------------------------------------------
-- 2. CRÉER LA TABLE public.clients (Les Marques)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  contact_name text,
  contact_email text,
  address text,
  created_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.clients IS 'Marques / annonceurs liés au créateur (Loi Influenceurs)';
COMMENT ON COLUMN public.clients.address IS 'Siège social de la marque (requis pour le contrat)';

CREATE INDEX IF NOT EXISTS idx_clients_user_id ON public.clients(user_id);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 3. CRÉER LA TABLE public.deals (Les Collaborations)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'signed', 'paid', 'dispute')),
  contract_date date NOT NULL DEFAULT CURRENT_DATE,
  description text,
  cash_amount integer NOT NULL DEFAULT 0,
  gift_value integer NOT NULL DEFAULT 0,
  rights_transfer jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  total_deal_value integer GENERATED ALWAYS AS (cash_amount + gift_value) STORED
);

COMMENT ON TABLE public.deals IS 'Collaborations / contrats d''influence (Loi Influenceurs)';
COMMENT ON COLUMN public.deals.cash_amount IS 'Rémunération en centimes';
COMMENT ON COLUMN public.deals.gift_value IS 'Valeur des cadeaux en centimes';
COMMENT ON COLUMN public.deals.rights_transfer IS 'Ex: { "duration": "1 year", "territory": "World" }';
COMMENT ON COLUMN public.deals.total_deal_value IS 'Valeur totale en centimes (cash_amount + gift_value)';

CREATE INDEX IF NOT EXISTS idx_deals_user_id ON public.deals(user_id);
CREATE INDEX IF NOT EXISTS idx_deals_client_id ON public.deals(client_id);
CREATE INDEX IF NOT EXISTS idx_deals_status ON public.deals(status);
CREATE INDEX IF NOT EXISTS idx_deals_total_value ON public.deals(total_deal_value);

ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 4. POLITIQUES RLS - clients (SELECT, INSERT, UPDATE, DELETE si auth.uid() = user_id)
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "clients_select_own" ON public.clients;
CREATE POLICY "clients_select_own" ON public.clients
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "clients_insert_own" ON public.clients;
CREATE POLICY "clients_insert_own" ON public.clients
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "clients_update_own" ON public.clients;
CREATE POLICY "clients_update_own" ON public.clients
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "clients_delete_own" ON public.clients;
CREATE POLICY "clients_delete_own" ON public.clients
  FOR DELETE USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 5. POLITIQUES RLS - deals (SELECT, INSERT, UPDATE, DELETE si auth.uid() = user_id)
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "deals_select_own" ON public.deals;
CREATE POLICY "deals_select_own" ON public.deals
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "deals_insert_own" ON public.deals;
CREATE POLICY "deals_insert_own" ON public.deals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "deals_update_own" ON public.deals;
CREATE POLICY "deals_update_own" ON public.deals
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "deals_delete_own" ON public.deals;
CREATE POLICY "deals_delete_own" ON public.deals
  FOR DELETE USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- BONUS : Colonne générée total_deal_value (déjà ajoutée dans CREATE TABLE deals)
-- Utilisation : SELECT total_deal_value FROM deals WHERE ... (seuils, totaux, etc.)
-- Pas de vue supplémentaire pour éviter tout contournement RLS.
-- -----------------------------------------------------------------------------
