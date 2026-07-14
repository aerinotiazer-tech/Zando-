# Configuration des Emails Professionnels — ZANDO

Ce document décrit en détail la mise en place de la messagerie professionnelle pour **Zando** à Niamey, en utilisant **Resend** et **Supabase Auth**.

---

## 📬 1. Configuration de l'Expéditeur & DNS (Resend)

Pour garantir que vos emails ne finissent pas dans le dossier Spam de vos clients au Niger, vous devez valider votre nom de domaine sur votre console Resend :

1.  Connectez-vous à votre compte **Resend**.
2.  Allez dans **Domains** > **Create Domain**.
3.  Saisissez votre domaine (ex: `zando.ne`).
4.  Configurez les enregistrements DNS fournis par Resend (DKIM, SPF, MX) dans votre tableau de bord **Cloudflare DNS** :
    *   **Enregistrements TXT** pour `resend._domainkey.zando.ne`.
    *   **Enregistrements MX** pour la gestion de la réception si configurée.

---

## ⚙️ 2. Liaison de Supabase à Resend (SMTP Custom)

Par défaut, Supabase limite l'envoi à 3 emails par heure via son SMTP partagé. Pour la production, vous devez lier votre projet Supabase à votre compte SMTP Resend :

1.  Sur le tableau de bord **Supabase**, allez dans **Project Settings > Auth**.
2.  Sous la section **SMTP Configuration**, activez l'option **Enable Custom SMTP**.
3.  Saisissez les paramètres de connexion fournis par Resend :
    *   **SMTP Host :** `smtp.resend.com`
    *   **Port :** `465` (avec SSL) ou `587` (avec TLS).
    *   **Username :** `resend` (toujours ce nom pour l'API Resend).
    *   **Password :** Votre clé API Resend (`re_xxxxxxxxx`).
    *   **Sender Email :** `noreply@zando.ne` (ou l'adresse vérifiée de votre choix).
    *   **Sender Name :** `Zando`
4.  Sauvegardez les modifications.

---

## 🎨 3. Personnalisation des Templates d'Authentification (Supabase Auth)

Saisissez ces codes HTML d'élite directement dans la console Supabase sous **Auth > Email Templates**. Ils ont été conçus avec soin pour correspondre à l'esthétique premium de Zando (fonds épurés, boutons à contraste élevé, typographie lisible sur mobile).

### A. Template : Confirmation d'inscription (Confirm Signup)
**Sujet :** `Confirmez votre compte Zando`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background-color: #0f172a; padding: 32px; text-align: center; }
    .logo { color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; margin: 0; }
    .content { padding: 40px 32px; line-height: 1.6; }
    .title { font-size: 22px; font-weight: 600; color: #0f172a; margin-top: 0; margin-bottom: 20px; }
    .btn { display: inline-block; background-color: #0f172a; color: #ffffff !important; text-decoration: none !important; font-size: 15px; font-weight: 600; padding: 14px 28px; border-radius: 8px; margin: 24px 0; }
    .footer { background-color: #f1f5f9; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer-text { font-size: 12px; color: #64748b; margin: 4px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><div class="logo">ZANDO</div></div>
    <div class="content">
      <h1 class="title">Bienvenue sur Zando</h1>
      <p>Bonjour,</p>
      <p>Merci de rejoindre Zando, la marketplace premium du Niger. Pour activer votre compte de confiance et commencer vos achats en toute sécurité, veuillez confirmer votre adresse email en cliquant ci-dessous :</p>
      <div style="text-align: center;">
        <a href="{{ .ConfirmationURL }}" class="btn">Confirmer mon adresse email</a>
      </div>
      <p style="color: #64748b; font-size: 14px;">Si le bouton ne fonctionne pas, copiez-collez ce lien dans votre navigateur :<br>{{ .ConfirmationURL }}</p>
    </div>
    <div class="footer">
      <p style="font-weight:700; color:#0f172a; font-size:10px; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:8px;">ZANDO • NIAMEY</p>
      <p class="footer-text">L'infrastructure de commerce digital de confiance au Niger.</p>
    </div>
  </div>
</body>
</html>
```

### B. Template : Réinitialisation de mot de passe (Reset Password)
**Sujet :** `Réinitialisation de votre mot de passe Zando`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background-color: #0f172a; padding: 32px; text-align: center; }
    .logo { color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; margin: 0; }
    .content { padding: 40px 32px; line-height: 1.6; }
    .title { font-size: 22px; font-weight: 600; color: #0f172a; margin-top: 0; margin-bottom: 20px; }
    .btn { display: inline-block; background-color: #d97706; color: #ffffff !important; text-decoration: none !important; font-size: 15px; font-weight: 600; padding: 14px 28px; border-radius: 8px; margin: 24px 0; }
    .footer { background-color: #f1f5f9; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer-text { font-size: 12px; color: #64748b; margin: 4px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><div class="logo">ZANDO</div></div>
    <div class="content">
      <h1 class="title">Mot de passe oublié ?</h1>
      <p>Bonjour,</p>
      <p>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte Zando. Vous pouvez définir un nouveau mot de passe sécurisé en cliquant sur le lien ci-dessous :</p>
      <div style="text-align: center;">
        <a href="{{ .ConfirmationURL }}" class="btn">Modifier mon mot de passe</a>
      </div>
      <p style="color: #64748b; font-size: 14px;">Ce lien expirera sous peu. Si vous n'avez pas initié cette demande, vous pouvez ignorer cet email.</p>
    </div>
    <div class="footer">
      <p style="font-weight:700; color:#0f172a; font-size:10px; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:8px;">ZANDO • NIAMEY</p>
      <p class="footer-text">L'infrastructure de commerce digital de confiance au Niger.</p>
    </div>
  </div>
</body>
</html>
```

---

## 🛍️ 4. Validation & Redirection des Liens d'Authentification

Pour sécuriser et valider les jetons de sécurité sans exposer aucune clé d'API, l'application utilise l'infrastructure native de **Supabase Auth** reliée à deux points de terminaison Next.js server-side ultra-sécurisés :

### A. Point de terminaison : Confirmation de Jeton (`/api/auth/confirm`)
Ce point de terminaison valide les jetons de type OTP, confirmation d'inscription et récupération de mot de passe directement via Supabase :
*   **Fonctionnement :** `https://zando.ne/api/auth/confirm?token_hash=...&type=signup&next=/`

### B. Point de terminaison : Code d'Échange PKCE (`/api/auth/callback`)
Ce point de terminaison échange le code PKCE contre une session utilisateur active et stocke de manière sécurisée les informations d'authentification dans le client :
*   **Fonctionnement :** `https://zando.ne/api/auth/callback?code=...`

---

## 🔐 5. Configuration des Redirections de Confiance dans Supabase Auth

Pour que le parcours utilisateur fonctionne parfaitement de bout en bout, configurez les URL de redirection de confiance directement dans la console Supabase :

1.  Allez dans **Auth > URL Configuration**.
2.  Définissez le **Site URL** principal sur votre nom de domaine de production :
    *   `https://zando.ne`
3.  Ajoutez les URL suivantes dans la section **Redirect URLs** (pour le développement local et la production) :
    *   `https://zando.ne/api/auth/callback`
    *   `https://zando.ne/api/auth/confirm`
    *   `http://localhost:3000/api/auth/callback`
    *   `http://localhost:3000/api/auth/confirm`

### 🔄 Parcours Utilisateur de Bout en Bout
1. **Inscription :** L'utilisateur remplit le formulaire sur Zando.
2. **Notification :** Supabase Auth intercepte la requête et envoie un email premium en utilisant le serveur SMTP **Resend** configuré.
3. **Clic :** L'utilisateur clique sur le lien d'activation : `https://zando.ne/api/auth/confirm?token_hash=...&type=signup`.
4. **Validation :** L'API Next.js interagit en arrière-plan avec Supabase pour confirmer le jeton de sécurité (`verifyOtp`).
5. **Connexion & Succès :** L'utilisateur est redirigé vers l'application avec sa session active.
