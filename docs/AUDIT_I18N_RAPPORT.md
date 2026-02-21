# Rapport d'audit i18n – Textes codés en dur (front-end)

**Périmètre** : `src/` (components, pages).  
**Exclus** : messages d’erreur dynamiques du backend (`error.message`), valeurs techniques (classes CSS, `value` d’options), identifiants API.  
**Focus** : textes exposés à l’utilisateur final.

---

## 1. Textes entre balises JSX (hors `{t(...)}`)

| Fichier | Ligne(s) | Texte en dur |
|---------|----------|--------------|
| `src/components/Layout/Footer.jsx` | 14 | `Know your worth.` |
| `src/components/Layout/Footer.jsx` | 23 | `Calculators` |
| `src/components/Layout/Footer.jsx` | 31, 37, 43, 49, 55 | `YouTube Calculator`, `Instagram Calculator`, `TikTok Calculator`, `Twitch Calculator`, `Podcast Calculator` |
| `src/components/Layout/Footer.jsx` | 70 | `Resources` |
| `src/components/Layout/Footer.jsx` | 79, 86, 93 | `Pricing Guide`, `Pricing`, `FAQ` |
| `src/components/Layout/Footer.jsx` | 101 | `Legal` |
| `src/components/Layout/Footer.jsx` | 110, 117, 124, 132 | `Contact`, `Privacy Policy`, `Terms of Service`, `Legal Notice` |
| `src/components/ClientAnalyticsView.jsx` | 234 | `Analyses visuelles PRO` |
| `src/components/ClientAnalyticsView.jsx` | 279, 340 | `Aucune donnée sur cette période.` |
| `src/components/Calculator/PremiumCalculatorForm.jsx` | 205 | `PRO` |
| `src/components/Calculator/Calculator.jsx` | 325 | `Want unlimited?` + lien `Upgrade to Pro` |
| `src/components/Premium/CalculationDetailsModal.jsx` | 180 | `Offer vs Market Value` |
| `src/components/Premium/CalculationDetailsModal.jsx` | 257 | `Upgrade to unlock full breakdown` |
| `src/components/Premium/CalculationDetailsModal.jsx` | 273, 284, 293, 296, 302, 308 | `Audience`, `Sponsor Context`, `Financials`, `Brand Offer`, `WMR Recommended`, `Final Price` |
| `src/components/Premium/EmailTemplates.jsx` | 253-256 | `Tip: Replace all [PLACEHOLDERS] with your actual information before sending.` |
| `src/components/Premium/EmailTemplates.jsx` | 264-271 | `How to Use These Templates` + liste 1.–5. (Copy to Clipboard, Paste…, Replace…, Adjust…, Send…) |
| `src/components/NotificationDropdown.jsx` | 59 | `Notifications` |
| `src/components/NotificationDropdown.jsx` | 63 | `Aucune alerte.` |
| `src/components/ContractGenerationModal.jsx` | 94-95 | `Générer un contrat pour {client} / ce client` |
| `src/components/ContractGenerationModal.jsx` | 97, 102 | `Sélectionnez les prestations…`, `Aucun deal pour ce client.` |
| `src/components/ContractGenerationModal.jsx` | 131 | `Sans description` (fallback deal) |
| `src/components/ContractGenerationModal.jsx` | 150, 160, 170 | `Options de cession de droits`, `Standard (1 an, Monde, RS + Web)`, `Personnalisé` |
| `src/components/ContractGenerationModal.jsx` | 176, 186, 196 | `Durée`, `Territoire`, `Supports` |
| `src/components/ContractGenerationModal.jsx` | 211 | `Total des prestations sélectionnées` |
| `src/components/ContractGenerationModal.jsx` | 214-215 | `Attention : WMR ne sauvegarde pas…` (avertissement) |
| `src/components/ContractGenerationModal.jsx` | 221, 236 | `Annuler`, `Générer le Contrat PDF` |
| `src/components/Premium/MediaKitGenerator.jsx` | 186-248 | Bloc PDF : `Performance (Last 30 Days)`, `Avg. Views`, `Engagement`, `Total Audience`, `Viral Potential`, `Audience Profile`, `Partnership Investment`, `RECOMMENDED RATE`, `Powered by WhatsMyRate.com`, etc. |
| `src/components/Premium/UpdateFinalPriceModal.jsx` | 92-93 | `Deal Status` |
| `src/components/Premium/UpdateFinalPriceModal.jsx` | 100-102 | Options : `Active / Negotiating`, `Won / Signed`, `Lost / Declined` |
| `src/components/Premium/UpdateFinalPriceModal.jsx` | 111, 117+ | `Cancel`, libellé bouton de mise à jour |
| `src/components/Premium/PremiumBadge.jsx` | 7 | `Premium` |
| `src/components/QuotaModal.jsx` | 39-40 | `Quota mensuel atteint` |
| `src/components/QuotaModal.jsx` | 52-54 | Paragraphe explicatif (téléchargement gratuit utilisé, passer à Pro…) |
| `src/components/QuotaModal.jsx` | 64, 71 | `Fermer`, `Débloquer WMR Pro` |
| `src/components/HelpBubble.jsx` | 4-28 | Objet `HELP_CONTENTS` : titres, paragraphes, items, legalNote (tout en français en dur) |
| `src/pages/Dashboard.jsx` | 770, 940 | `<title>Dashboard - WMR</title>` |
| `src/pages/PremiumCalculator.jsx` | 12, 22, 25 | `Premium Calculator - WMR`, `Premium Calculator`, `Calculate Your Exact Rate` |
| `src/pages/FreeCalculator.jsx` | 8, 17 | `Free Offer Calculator - WMR`, `Is That Brand Deal Worth It?` |
| `src/pages/NotFound.jsx` | 9-10, 18-21, 33, 37-44 | Titre/meta 404, `Page Not Found`, `Oops! The page…`, `Or try one of these pages:`, `Go to Home Page`, `Calculator`, `Pricing` |

---

## 2. Placeholders, alt, title, aria-label

| Fichier | Ligne | Attribut | Valeur en dur |
|---------|-------|----------|----------------|
| `src/components/Layout/Header.jsx` | 96 | `alt` | `WMR` |
| `src/components/Layout/Header.jsx` | 199 | `aria-label` | `Toggle menu` |
| `src/components/HelpBubble.jsx` | 37 | `aria-label` | `Contact / Aide` (si présent après refactor) |
| `src/components/ClientAnalyticsView.jsx` | 201, 219 | `title` (graphiques) | `Répartition CA par marque (365 j)`, `CA mensuel par marque (365 j)` |
| `src/components/ClientAnalyticsView.jsx` | 236 | `aria-label` bouton | `Fermer` |
| `src/components/NotificationDropdown.jsx` | 41, 82 | `aria-label` | `Notifications`, `Fermer` |
| `src/components/QuotaModal.jsx` | 47 | `aria-label` | `Fermer` |
| `src/components/LegalProfileForm.jsx` | 163, 181, 196, 230 | `placeholder` | `Ex. Jean Dupont…`, `14 chiffres`, `Numéro, voie…`, `FRXX999999999` |
| `src/components/ContractGenerationModal.jsx` | 181, 191, 201 | `placeholder` | `Ex. 6 mois, 5 ans`, `Ex. France uniquement, Europe`, `Ex. TV + Cinéma…` |
| `src/components/Premium/UpdateFinalPriceModal.jsx` | 79 | `placeholder` | `0` |
| `src/pages/Dashboard.jsx` | 1202, 1249, 1768 | `title` (boutons/tooltips) | `Edit final price`, `View calculation details`, `Make a calculation first` |
| `src/components/UI/index.js` (Spinner) | 211, 213 | `aria-label`, `sr-only` | `Loading`, `Loading...` |

---

## 3. Notifications / alert() / messages utilisateur

| Fichier | Ligne | Contexte | Texte en dur |
|---------|-------|----------|--------------|
| `src/pages/Settings.jsx` | 77 | alert checkout | `'Failed to start checkout: ' + (err?.message \|\| err)` — préfixe anglais en dur |
| `src/pages/Dashboard.jsx` | 370, 440 | alert sauvegarde calcul | `'Error saving calculation: ' + error.message` |
| `src/pages/Dashboard.jsx` | 485 | alert statut deal | `'Error updating deal status: ' + error.message` |
| `src/pages/Dashboard.jsx` | 1850 | alert mise à jour deal | `'Error updating deal: ' + error.message` |
| `src/pages/Dashboard.jsx` | 1887 | alert Media Kit | `'Media Kit from details is coming soon. Use Quick Actions for now.'` |
| `src/components/Calculator/Calculator.jsx` | 206 | alert | `'Please login to save calculations'` |
| `src/components/Calculator/Calculator.jsx` | 224 | alert | `'Saved to history!'` |
| `src/components/Calculator/Calculator.jsx` | 228 | alert | `'Failed to save. Please try again.'` |
| `src/components/Premium/EmailTemplates.jsx` | 142 | alert | `'Failed to copy to clipboard'` |
| `src/hooks/useAuth.jsx` | 251 | alert | `'Subscription management is not available for this plan yet.'` |
| `src/components/ClientCard.jsx` | 205 | alert (fallback) | `'Erreur lors de la génération du PDF.'` (si pas err.message) |

*(Les usages de `t()` pour alert/erreur dans Login, Signup, Settings security, ClientCard pour alert_profile_incomplete / alert_no_deals sont déjà i18n.)*

---

## 4. Pages SEO / contenu long en dur

| Fichier | Remarque |
|---------|----------|
| `src/pages/seo/InstagramSponsorshipCalculator.jsx` | Listes « Stay forever », « Build your aesthetic », « Viral potential », etc. (lignes 160-191) — tout le contenu éducatif en anglais en dur. |
| `src/pages/seo/HowMuchToChargeSponsorship.jsx` | Page entière : titres (Why Most Creators Undercharge, Sponsorship Rates by Platform…), paragraphes, listes, checklist, FAQ — tout en anglais en dur. |
| `src/pages/seo/GuideTarifsSponsor.jsx` | `title` / `subtitle` en dur. |

*(Les autres pages SEO peuvent contenir aussi des blocs de texte non passés par `t()` ; à vérifier au besoin.)*

---

## 5. Données factices (mock) exposées à l’utilisateur

| Fichier | Ligne | Données |
|---------|-------|---------|
| `src/components/NotificationDropdown.jsx` | 11-12 | `MOCK_NOTIFICATIONS` : titres et descriptions en français (`Seuil légal dépassé`, `Partenariat à renouveler`, etc.) |

---

## Synthèse

- **Footer** : entièrement en dur (slogan, titres de colonnes, liens).
- **NotFound** : titre, description, boutons, liens.
- **Modales** : QuotaModal, ContractGenerationModal, UpdateFinalPriceModal — libellés, placeholders, boutons.
- **HelpBubble** : tout le contenu d’aide (HELP_CONTENTS) en français.
- **Composants Premium** : CalculationDetailsModal, EmailTemplates, MediaKitGenerator, PremiumBadge, UpdateFinalPriceModal.
- **Dashboard** : titres de page, tooltips (`title`), alerts.
- **Calculators** : lien « Upgrade to Pro », badges « PRO », alerts (save/login).
- **ClientAnalyticsView, NotificationDropdown** : titres, messages vides, aria-labels.
- **LegalProfileForm** : placeholders.
- **Header** : alt logo, aria-label menu.
- **UI (Spinner)** : aria-label / sr-only « Loading ».
- **Pages SEO** : InstagramSponsorshipCalculator, HowMuchToChargeSponsorship (et potentiellement d’autres) avec gros blocs de texte non i18n.

Le front-end **n’est pas** 100 % i18n-compliant : les éléments ci-dessus sont des textes exposés à l’utilisateur et non passés par `useTranslation` / `t()`.

---

## Proposition de structure JSON pour les clés manquantes

À ajouter dans `fr.json` / `en.json` (organisation par domaine) :

```json
{
  "footer": {
    "tagline": "Know your worth.",
    "calculators": "Calculators",
    "youtube_calc": "YouTube Calculator",
    "instagram_calc": "Instagram Calculator",
    "tiktok_calc": "TikTok Calculator",
    "twitch_calc": "Twitch Calculator",
    "podcast_calc": "Podcast Calculator",
    "resources": "Resources",
    "pricing_guide": "Pricing Guide",
    "pricing": "Pricing",
    "faq": "FAQ",
    "legal": "Legal",
    "contact": "Contact",
    "privacy_policy": "Privacy Policy",
    "terms_of_service": "Terms of Service",
    "legal_notice": "Legal Notice"
  },
  "not_found": {
    "meta_title": "404 - Page Not Found | WMR",
    "meta_description": "The page you're looking for doesn't exist",
    "title": "Page Not Found",
    "message": "Oops! The page you're looking for doesn't exist or has been moved.",
    "go_home": "Go to Home Page",
    "or_try": "Or try one of these pages:",
    "calculator": "Calculator",
    "pricing": "Pricing"
  },
  "quota_modal": {
    "title": "Quota mensuel atteint",
    "description": "Votre téléchargement gratuit du mois a été utilisé. Pas de souci : en passant à l'abonnement Pro, vous débloquez…",
    "close": "Fermer",
    "upgrade_cta": "Débloquer WMR Pro"
  },
  "contract_modal": {
    "title": "Générer un contrat pour {{client}}",
    "title_fallback": "ce client",
    "hint_select": "Sélectionnez les prestations à inclure dans le PDF.",
    "no_deals": "Aucun deal pour ce client.",
    "no_description": "Sans description",
    "rights_options": "Options de cession de droits",
    "rights_standard": "Standard (1 an, Monde, RS + Web)",
    "rights_custom": "Personnalisé",
    "duration": "Durée",
    "territory": "Territoire",
    "supports": "Supports",
    "total_services": "Total des prestations sélectionnées",
    "warning_no_save": "Attention : WMR ne sauvegarde pas les PDF générés. Téléchargez-les immédiatement.",
    "cancel": "Annuler",
    "generate_btn": "Générer le Contrat PDF"
  },
  "alerts": {
    "login_to_save": "Please login to save calculations",
    "saved_to_history": "Saved to history!",
    "save_failed": "Failed to save. Please try again.",
    "copy_failed": "Failed to copy to clipboard",
    "checkout_failed_prefix": "Failed to start checkout",
    "media_kit_coming_soon": "Media Kit from details is coming soon. Use Quick Actions for now.",
    "subscription_manage_unavailable": "Subscription management is not available for this plan yet.",
    "pdf_generation_error": "Erreur lors de la génération du PDF."
  },
  "dashboard": {
    "page_title": "Dashboard - WMR",
    "edit_final_price": "Edit final price",
    "view_calculation_details": "View calculation details",
    "make_calculation_first": "Make a calculation first"
  },
  "calculator": {
    "want_unlimited": "Want unlimited?",
    "upgrade_pro": "Upgrade to Pro"
  },
  "notifications": {
    "title": "Notifications",
    "empty": "Aucune alerte.",
    "close": "Fermer"
  },
  "common": {
    "loading": "Loading",
    "close": "Fermer",
    "cancel": "Cancel"
  }
}
```

*(À compléter avec les clés pour HelpBubble, LegalProfileForm placeholders, UpdateFinalPriceModal, CalculationDetailsModal, EmailTemplates, MediaKitGenerator, PremiumBadge, ClientAnalyticsView, Header alt/aria-label, et les pages SEO si vous décidez de les internationaliser.)*

---

**Conclusion** : de nombreux textes utilisateur sont encore codés en dur dans les composants et pages listés ci-dessus. Le rapport n’est pas vide ; le front-end n’est donc **pas** 100 % i18n-compliant. La structure JSON proposée peut servir de base pour intégrer les traductions et brancher `t()` dans les fichiers concernés.
