/**
 * ZANDO — Premium Responsive HTML Email Templates
 * Conçus pour s'adapter parfaitement sur mobile et ordinateurs avec un style d'élite (minimaliste, haute lisibilité).
 */

const BRAND_COLOR = "#0f172a"; // Deep Charcoal
const ACCENT_COLOR = "#d97706"; // Amber Gold
const GRAY_LIGHT = "#f8fafc"; // Slate-50
const TEXT_DARK = "#1e293b"; // Slate-800

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderData {
  orderId: string;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryAddress: string;
  deliveryPhone: string;
}

interface ShopData {
  ownerName: string;
  shopName: string;
  dashboardUrl: string;
}

/**
 * 1. Template de Confirmation de Compte (pour inscription / Supabase Auth)
 */
export function getConfirmAccountTemplate(confirmUrl: string, userName: string = "Cher client"): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmez votre compte Zando</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: ${GRAY_LIGHT}; color: ${TEXT_DARK}; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background-color: ${BRAND_COLOR}; padding: 32px; text-align: center; }
    .logo { color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; margin: 0; }
    .content { padding: 40px 32px; line-height: 1.6; }
    .title { font-size: 22px; font-weight: 600; color: ${BRAND_COLOR}; margin-top: 0; margin-bottom: 20px; }
    .greeting { font-size: 16px; margin-bottom: 16px; }
    .text { font-size: 15px; color: #475569; margin-bottom: 24px; }
    .button-container { text-align: center; margin: 32px 0; }
    .btn { display: inline-block; background-color: ${BRAND_COLOR}; color: #ffffff !important; text-decoration: none !important; font-size: 15px; font-weight: 600; padding: 14px 28px; border-radius: 8px; letter-spacing: 0.02em; transition: background-color 0.2s ease; }
    .footer { background-color: #f1f5f9; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer-text { font-size: 12px; color: #64748b; line-height: 1.5; margin: 4px 0; }
    .footer-accent { font-weight: 700; color: ${BRAND_COLOR}; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">ZANDO</div>
    </div>
    <div class="content">
      <h1 class="title">Bienvenue sur Zando</h1>
      <p class="greeting">Bonjour ${userName},</p>
      <p class="text">Merci de rejoindre Zando, la marketplace digitale premium de Niamey. Pour finaliser la création de votre compte et accéder en toute sécurité à nos boutiques vérifiées, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous :</p>
      <div class="button-container">
        <a href="${confirmUrl}" class="btn" target="_blank">Activer mon compte</a>
      </div>
      <p class="text">Ce lien est valide pour une durée de 24 heures. Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email en toute sécurité.</p>
    </div>
    <div class="footer">
      <div class="footer-accent">ZANDO • NIAMEY</div>
      <p class="footer-text">L'infrastructure de commerce digital de confiance au Niger.</p>
      <p class="footer-text">support@zando.ne • contact@zando.ne</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * 2. Template de Réinitialisation de Mot de Passe (pour Supabase Auth)
 */
export function getResetPasswordTemplate(resetUrl: string, userName: string = "Cher membre"): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Réinitialisation de votre mot de passe Zando</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: ${GRAY_LIGHT}; color: ${TEXT_DARK}; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background-color: ${BRAND_COLOR}; padding: 32px; text-align: center; }
    .logo { color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; margin: 0; }
    .content { padding: 40px 32px; line-height: 1.6; }
    .title { font-size: 22px; font-weight: 600; color: ${BRAND_COLOR}; margin-top: 0; margin-bottom: 20px; }
    .greeting { font-size: 16px; margin-bottom: 16px; }
    .text { font-size: 15px; color: #475569; margin-bottom: 24px; }
    .button-container { text-align: center; margin: 32px 0; }
    .btn { display: inline-block; background-color: ${ACCENT_COLOR}; color: #ffffff !important; text-decoration: none !important; font-size: 15px; font-weight: 600; padding: 14px 28px; border-radius: 8px; letter-spacing: 0.02em; transition: background-color 0.2s ease; }
    .footer { background-color: #f1f5f9; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer-text { font-size: 12px; color: #64748b; line-height: 1.5; margin: 4px 0; }
    .footer-accent { font-weight: 700; color: ${BRAND_COLOR}; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">ZANDO</div>
    </div>
    <div class="content">
      <h1 class="title">Demande de réinitialisation</h1>
      <p class="greeting">Bonjour ${userName},</p>
      <p class="text">Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte Zando. Vous pouvez définir un nouveau mot de passe sécurisé en cliquant sur le lien ci-dessous :</p>
      <div class="button-container">
        <a href="${resetUrl}" class="btn" target="_blank">Modifier mon mot de passe</a>
      </div>
      <p class="text">Ce lien expirera automatiquement dans 15 minutes par mesure de sécurité. Si vous n'avez pas demandé cette réinitialisation, ignorez cet email; votre mot de passe actuel restera inchangé.</p>
    </div>
    <div class="footer">
      <div class="footer-accent">ZANDO • NIAMEY</div>
      <p class="footer-text">L'infrastructure de commerce digital de confiance au Niger.</p>
      <p class="footer-text">support@zando.ne • contact@zando.ne</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * 3. Template de Confirmation de Commande (Email Transactionnel Acheteur)
 */
export function getOrderConfirmationTemplate(data: OrderData): string {
  const formattedItems = data.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px;">${item.name} <span style="color: #64748b;">x${item.quantity}</span></td>
      <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; text-align: right; font-size: 14px; font-weight: 500;">${(item.price * item.quantity).toLocaleString("fr-FR")} FCFA</td>
    </tr>
  `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Votre commande sur Zando — #${data.orderId.slice(0, 8).toUpperCase()}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: ${GRAY_LIGHT}; color: ${TEXT_DARK}; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background-color: ${BRAND_COLOR}; padding: 32px; text-align: center; }
    .logo { color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; margin: 0; }
    .content { padding: 40px 32px; line-height: 1.6; }
    .title { font-size: 22px; font-weight: 600; color: ${BRAND_COLOR}; margin-top: 0; margin-bottom: 8px; }
    .subtitle { font-size: 14px; color: #64748b; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.05em; }
    .greeting { font-size: 16px; margin-bottom: 16px; font-weight: 500; }
    .text { font-size: 15px; color: #475569; margin-bottom: 24px; }
    
    .table-container { margin: 24px 0; }
    .order-table { width: 100%; border-collapse: collapse; }
    .order-header { text-align: left; font-size: 12px; text-transform: uppercase; color: #64748b; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
    .total-row { font-size: 16px; font-weight: 700; color: ${BRAND_COLOR}; }
    
    .details-box { background-color: #f8fafc; border-radius: 8px; padding: 20px; border: 1px solid #e2e8f0; margin-top: 24px; }
    .details-title { font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; margin-top: 0; margin-bottom: 12px; letter-spacing: 0.02em; }
    .details-text { font-size: 14px; color: #334155; margin: 4px 0; }
    
    .footer { background-color: #f1f5f9; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer-text { font-size: 12px; color: #64748b; line-height: 1.5; margin: 4px 0; }
    .footer-accent { font-weight: 700; color: ${BRAND_COLOR}; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">ZANDO</div>
    </div>
    <div class="content">
      <h1 class="title">Merci pour votre commande</h1>
      <div class="subtitle">Référence : #${data.orderId.toUpperCase()}</div>
      <p class="greeting">Bonjour ${data.customerName},</p>
      <p class="text">Votre commande a été enregistrée avec succès auprès de nos boutiques certifiées. Notre équipe logistique effectuera la vérification de conformité de vos articles sous 24h avant la prise en charge pour la livraison à Niamey.</p>
      
      <div class="table-container">
        <table class="order-table">
          <thead>
            <tr>
              <th class="order-header" style="text-align: left;">Article</th>
              <th class="order-header" style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${formattedItems}
            <tr>
              <td style="padding: 16px 0 0 0; font-size: 15px; font-weight: 700;">Sous-total</td>
              <td style="padding: 16px 0 0 0; text-align: right; font-size: 15px; font-weight: 700;">${data.totalAmount.toLocaleString("fr-FR")} FCFA</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 14px; color: #64748b;">Livraison sécurisée (Niamey)</td>
              <td style="padding: 8px 0; text-align: right; font-size: 14px; color: #16a34a; font-weight: 600;">Gratuit / Inclus</td>
            </tr>
            <tr class="total-row">
              <td style="padding: 16px 0 0 0; border-top: 2px solid #e2e8f0; font-size: 18px;">Montant Total</td>
              <td style="padding: 16px 0 0 0; border-top: 2px solid #e2e8f0; text-align: right; font-size: 18px;">${data.totalAmount.toLocaleString("fr-FR")} FCFA</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="details-box">
        <h3 class="details-title">Adresse et Contact de Livraison</h3>
        <p class="details-text" style="font-weight: 600;">${data.customerName}</p>
        <p class="details-text">${data.deliveryAddress}</p>
        <p class="details-text" style="color: #64748b;">Téléphone : ${data.deliveryPhone}</p>
      </div>
    </div>
    <div class="footer">
      <div class="footer-accent">ZANDO • NIAMEY</div>
      <p class="footer-text">Votre livraison sera confirmée par téléphone par notre coursier officiel.</p>
      <p class="footer-text">support@zando.ne • contact@zando.ne</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * 4. Template d'Approbation de Boutique (Email Transactionnel Vendeur)
 */
export function getShopApprovedTemplate(data: ShopData): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Votre boutique est validée sur Zando !</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: ${GRAY_LIGHT}; color: ${TEXT_DARK}; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background-color: ${BRAND_COLOR}; padding: 32px; text-align: center; }
    .logo { color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; margin: 0; }
    .content { padding: 40px 32px; line-height: 1.6; }
    .title { font-size: 22px; font-weight: 600; color: #16a34a; margin-top: 0; margin-bottom: 20px; }
    .greeting { font-size: 16px; margin-bottom: 16px; font-weight: 500; }
    .text { font-size: 15px; color: #475569; margin-bottom: 24px; }
    .badge { display: inline-block; background-color: #ecfdf5; color: #047857; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; }
    .button-container { text-align: center; margin: 32px 0; }
    .btn { display: inline-block; background-color: ${BRAND_COLOR}; color: #ffffff !important; text-decoration: none !important; font-size: 15px; font-weight: 600; padding: 14px 28px; border-radius: 8px; letter-spacing: 0.02em; }
    .footer { background-color: #f1f5f9; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer-text { font-size: 12px; color: #64748b; line-height: 1.5; margin: 4px 0; }
    .footer-accent { font-weight: 700; color: ${BRAND_COLOR}; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">ZANDO</div>
    </div>
    <div class="content">
      <div class="badge">Vendeur Vérifié Zando</div>
      <h1 class="title">Votre boutique est approuvée !</h1>
      <p class="greeting">Félicitations ${data.ownerName},</p>
      <p class="text">Nous avons le plaisir de vous informer que votre boutique <strong>"${data.shopName}"</strong> a été validée avec succès par notre équipe d'audit à Niamey. Votre badge de <strong>"Vendeur Vérifié"</strong> est désormais actif.</p>
      <p class="text">Vous pouvez dès à présent vous connecter à votre tableau de bord vendeur pour configurer vos fiches produits, suivre vos stocks en temps réel et commencer à recevoir des commandes d'acheteurs d'élite au Niger.</p>
      <div class="button-container">
        <a href="${data.dashboardUrl}" class="btn" target="_blank">Accéder à mon espace Vendeur</a>
      </div>
      <p class="text">Pour garantir une expérience d'exception, nous vous invitons à soigner la qualité des photographies et la description de vos articles. L'équipe Zando reste à vos côtés pour vous aider à maximiser votre chiffre d'affaires.</p>
    </div>
    <div class="footer">
      <div class="footer-accent">ZANDO • NIAMEY</div>
      <p class="footer-text">Rejoignez l'élite du commerce digital au Niger.</p>
      <p class="footer-text">vendeurs@zando.ne • support@zando.ne</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
