# 🚀 Supabase Setup Guide

Guide rapide pour configurer Supabase pour WMR.

---

## 📋 Étape 1 : Créer le Projet Supabase

1. Va sur [supabase.com](https://supabase.com)
2. Clique sur "Start your project"
3. Crée un nouveau projet :
   - **Name**: WMR
   - **Database Password**: (génère un mot de passe fort)
   - **Region**: Choisis la région la plus proche
4. Attends ~2 minutes que le projet soit créé

---

## 🔑 Étape 2 : Récupérer les Credentials

1. Dans ton projet Supabase, va dans **Settings** > **API**
2. Tu verras deux sections importantes :

### Project URL
```
https://xxxxxxxxxxx.supabase.co
```
Copie cette URL.

### Project API keys
- **anon public**: Clé publique (safe pour le client)
- **service_role**: Clé privée (JAMAIS sur le client)

Copie la clé **anon public**.

---

## 📝 Étape 3 : Configurer `.env`

1. Ouvre le fichier `.env` (déjà existant)
2. Ajoute ces lignes (ou mets à jour) :

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Remplace** les valeurs avec tes vraies credentials !

---

## 🗄️ Étape 4 : Créer la Table Subscriptions

1. Dans Supabase, va dans **SQL Editor**
2. Clique sur "New query"
3. Copie-colle ce SQL :

```sql
-- Create subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan TEXT NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active',
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Index for fast lookups
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own subscription
CREATE POLICY "Users can view own subscription"
ON subscriptions FOR SELECT
USING (auth.uid() = user_id);

-- Policy: System can insert/update subscriptions (for Stripe webhooks)
CREATE POLICY "Service role can manage subscriptions"
ON subscriptions FOR ALL
USING (auth.role() = 'service_role');

-- Function to auto-create free subscription on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.subscriptions (user_id, plan, status)
  VALUES (NEW.id, 'free', 'active');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create free subscription on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

4. Clique sur "Run" (ou F5)
5. Tu devrais voir "Success. No rows returned"

---

## ✅ Étape 5 : Configurer Auth Settings

### Email Templates (Optionnel)
1. Va dans **Authentication** > **Email Templates**
2. Personnalise les templates si tu veux :
   - Confirmation email
   - Reset password
   - Magic link

### Auth Providers
1. Va dans **Authentication** > **Providers**
2. **Email** devrait être activé par défaut
3. Configure les autres si tu veux (Google, GitHub, etc.)

### Redirect URLs
1. Va dans **Authentication** > **URL Configuration**
2. Ajoute tes redirect URLs :
   - Development: `http://localhost:5173/**`
   - Production: `https://ton-domaine.com/**`

---

## 🧪 Étape 6 : Tester

1. Redémarre ton serveur de dev :
```bash
npm run dev
```

2. Vérifie dans la console :
   - Pas de warning "Supabase credentials not found"
   - Pas d'erreur de connexion

3. Teste l'inscription :
   - Va sur `/signup`
   - Crée un compte
   - Vérifie dans Supabase > **Authentication** > **Users**

---

## 🎯 Vérification

### ✅ Checklist
- [ ] Projet Supabase créé
- [ ] URL copiée dans `.env`
- [ ] Anon key copiée dans `.env`
- [ ] Table `subscriptions` créée
- [ ] RLS policies activées
- [ ] Trigger auto-création subscription
- [ ] Serveur redémarré
- [ ] Pas d'erreur dans la console

---

## 🐛 Troubleshooting

### Erreur : "Supabase credentials not found"
**Cause** : Variables d'environnement non chargées

**Solution** :
1. Vérifie que `.env` existe à la racine
2. Vérifie que les noms sont corrects (`VITE_` prefix)
3. Redémarre le serveur (`npm run dev`)

### Erreur : "Invalid API key"
**Cause** : Mauvaise clé copiée

**Solution** :
1. Retourne dans Supabase > Settings > API
2. Re-copie la clé **anon public**
3. Assure-toi de copier la clé entière

### Erreur SQL : "relation does not exist"
**Cause** : Table pas créée

**Solution** :
1. Re-run le SQL de création de table
2. Vérifie dans Database > Tables

### Erreur : "New row violates row-level security policy"
**Cause** : RLS mal configuré

**Solution** :
1. Re-run les policies SQL
2. Vérifie que `auth.uid()` fonctionne

---

## 📊 Créer un Utilisateur de Test Pro

Pour tester les features premium :

1. Crée un compte normal via `/signup`
2. Va dans Supabase > **SQL Editor**
3. Run cette query (remplace `user_id`) :

```sql
UPDATE subscriptions
SET plan = 'pro', status = 'active'
WHERE user_id = 'uuid-de-ton-user';
```

4. Recharge l'app, tu devrais avoir accès premium !

---

## 🔐 Sécurité

### ✅ Do's
- Utilise `.env` pour les credentials
- Utilise RLS policies
- Valide les inputs
- Use anon key (public)

### ❌ Don'ts
- Jamais commit `.env`
- Jamais utiliser service_role key sur le client
- Jamais stocker des passwords en clair
- Jamais trust le client seul (valide côté serveur)

---

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Auth Guide](https://supabase.com/docs/guides/auth)
- [RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

---

**Status** : Prêt à configurer ! 🚀

Suis ces étapes et ton auth sera fonctionnel en 10 minutes !
