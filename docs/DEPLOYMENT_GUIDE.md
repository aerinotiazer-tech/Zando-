# Guide de Déploiement Production — ZANDO

Ce guide documente la configuration technique complète pour déployer **Zando** en production en utilisant l'architecture **Cloudflare (DNS + Pages + Workers)** et **Supabase**.

---

## 🚀 1. Architecture de Production

*   **Frontend & API Edge :** Next.js 15+ déployé sur **Cloudflare Pages** via **OpenNext** (Serverless/Worker-ready).
*   **Base de données & Auth & Storage :** **Supabase** (PostgreSQL managé) sécurisé par RLS (Row Level Security).
*   **Réseau & DNS :** **Cloudflare DNS** avec proxying de trafic actif (orange cloud) pour la protection anti-DDoS, SSL/TLS rigoureux et CDN.

---

## 🛠️ 2. Configuration du Build sur Cloudflare Pages

Lors de la création de votre projet sur le tableau de bord Cloudflare Pages, configurez les paramètres de build suivants :

1.  **Framework Preset :** Sélectionner `Next.js` ou `None` (configuré manuellement).
2.  **Build Command (Commande de build) :**
    ```bash
    npx @cloudflare/next-on-pages@1
    ```
    *Note : OpenNext génère une structure optimisée dans `.open-next/` compatible avec les bindings Cloudflare.*
3.  **Build Output Directory (Répertoire de sortie) :**
    ```text
    .open-next/assets
    ```
4.  **Root Directory (Répertoire racine) :** `/` (ou le sous-dossier contenant votre code Next.js si applicable).
5.  **Compatibility Date :** `2024-09-23` (ou supérieure).
6.  **Compatibility Flags :** Ajouter `nodejs_compat`.

---

## 🔑 3. Variables d'Environnement de Production

Vous devez configurer ces variables d'environnement dans le panneau **Settings > Environment variables** de votre projet Cloudflare Pages (pour les environnements de *Production* et de *Preview*) :

| Clé | Valeur attendue | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` | URL de votre instance de production Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1Ni...` | Clé publique anonyme Supabase de production |
| `GEMINI_API_KEY` | `AIzaSy...` | Clé d'API Google Gemini (exécutée côté serveur uniquement) |
| `APP_URL` | `https://zando.ne` (ou votre domaine) | URL principale de production (sans slash final) |

*🚨 **Sécurité :** Ne cochez jamais "Encrypt" pour les clés publiques (`NEXT_PUBLIC_`), mais assurez-vous de crypter `GEMINI_API_KEY`.*

---

## 🔒 4. Configuration SSL/TLS & HTTPS sur Cloudflare DNS

Pour garantir une sécurité maximale et la conformité aux standards bancaires/premium, configurez ces éléments dans le tableau de bord Cloudflare de votre domaine (`zando.ne`) :

1.  **Mode SSL/TLS :** 
    *   Allez dans **SSL/TLS > Overview**.
    *   Basculez le mode sur **Full (Strict)**. Cela chiffre de bout en bout le trafic entre le navigateur de l'utilisateur, Cloudflare, et vos serveurs Edge.
2.  **Always Use HTTPS (Toujours utiliser HTTPS) :**
    *   Allez dans **SSL/TLS > Edge Certificates**.
    *   Activez **Always Use HTTPS** pour forcer les connexions HTTP à se rediriger de manière sécurisée (code 301).
3.  **HSTS (HTTP Strict Transport Security) :**
    *   Dans **Edge Certificates**, activez **HSTS** pour indiquer aux navigateurs de ne se connecter qu'en HTTPS.
    *   *Paramètres recommandés :* Max Age = 12 mois (31536000s), Include subdomains = On, Preload = On.
4.  **DNSSEC :**
    *   Allez dans **DNS > Settings**.
    *   Activez **DNSSEC** pour protéger votre domaine contre l'empoisonnement de cache DNS et garantir l'authenticité des requêtes.

---

## 🌐 5. Configuration du Domaine Personnalisé

Pour connecter votre nom de domaine premium (ex: `zando.ne`) :

1.  **Sur Cloudflare Pages :**
    *   Allez dans votre projet Pages > **Custom domains**.
    *   Cliquez sur **Set up a custom domain** et entrez `zando.ne` (et/ou `www.zando.ne`).
2.  **Sur Cloudflare DNS :**
    *   Cloudflare Pages ajoutera automatiquement les enregistrements CNAME nécessaires pointant vers votre sous-domaine Pages (`xxxx.pages.dev`).
    *   Assurez-vous que le nuage de proxying est **Orange (Proxied)** pour bénéficier du WAF, de la mise en cache et de la protection DDoS.

---

## 🔀 6. Configuration des URLs de Redirection Supabase Auth

Pour que l'authentification et les confirmations d'emails fonctionnent correctement, vous devez configurer les URLs de redirection autorisées dans votre console Supabase de production :

1.  Allez sur votre **Supabase Dashboard > Authentication > URL Configuration**.
2.  **Site URL (URL du site) :**
    ```text
    https://zando.ne
    ```
3.  **Redirect URLs (URLs de redirection supplémentaires) :**
    Ajoutez les motifs d'URLs suivants pour gérer les previews Cloudflare et les environnements de développement :
    ```text
    https://zando.ne/**
    https://*.pages.dev/**
    http://localhost:3000/**
    ```
4.  **Configuration de l'Email de Confirmation (SignUp) :**
    *   Dans **Auth > Email Templates**, assurez-vous que les liens d'activation pointent vers votre redirecteur de confiance.
    *   *Exemple de template d'URL de confirmation d'email :* `{{ .SiteURL }}/api/auth/confirm?token_hash={{ .TokenHash }}&type=signup&next=/`

---

## 🛡️ 7. Règles de Sécurité Avancées (WAF)

Configurez des règles simples dans **Security > WAF** sur Cloudflare pour protéger l'infrastructure Zando à Niamey :

*   **Règle 1 : Bloquer les Bots malveillants connus**
    *   *Expression :* `(cf.client.bot) or (http.user_agent contains "Go-http-client")`
    *   *Action :* Block ou Managed Challenge.
*   **Règle 2 : Protection de la route Admin**
    *   Si l'administration de Zando n'est accessible que depuis des IPs connues ou nécessite un challenge :
    *   *Expression :* `(http.request.uri.path startswith "/admin")`
    *   *Action :* Managed Challenge (Demander un test Turnstile/CAPTCHA avant d'accéder à l'écran de connexion admin).
