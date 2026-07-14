import { NextRequest, NextResponse } from "next/server";
import { 
  getConfirmAccountTemplate, 
  getResetPasswordTemplate, 
  getOrderConfirmationTemplate, 
  getShopApprovedTemplate 
} from "../../../lib/email-templates";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Zando <noreply@zando.ne>";

    if (!apiKey) {
      console.warn("⚠️ [Resend] RESEND_API_KEY non configuré dans les variables d'environnement.");
      return NextResponse.json(
        { error: "Le service d'email n'est pas encore configuré." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { to, subject, templateName, templateData } = body;

    if (!to || !subject || !templateName) {
      return NextResponse.json(
        { error: "Champs requis manquants: 'to', 'subject', 'templateName'" },
        { status: 400 }
      );
    }

    // 1. Déterminer et générer le template HTML adéquat
    let htmlContent = "";

    switch (templateName) {
      case "confirm_account":
        htmlContent = getConfirmAccountTemplate(
          templateData?.confirmUrl || "https://zando.ne",
          templateData?.userName
        );
        break;
      case "reset_password":
        htmlContent = getResetPasswordTemplate(
          templateData?.resetUrl || "https://zando.ne",
          templateData?.userName
        );
        break;
      case "order_confirmation":
        if (!templateData?.orderId || !templateData?.items) {
          return NextResponse.json(
            { error: "Données de commande invalides pour le template 'order_confirmation'" },
            { status: 400 }
          );
        }
        htmlContent = getOrderConfirmationTemplate(templateData);
        break;
      case "shop_approved":
        if (!templateData?.shopName || !templateData?.ownerName) {
          return NextResponse.json(
            { error: "Données de boutique invalides pour le template 'shop_approved'" },
            { status: 400 }
          );
        }
        htmlContent = getShopApprovedTemplate({
          ownerName: templateData.ownerName,
          shopName: templateData.shopName,
          dashboardUrl: templateData.dashboardUrl || "https://zando.ne/?view=seller-dashboard"
        });
        break;
      case "custom":
        htmlContent = templateData?.html || `<p>${templateData?.text || ""}</p>`;
        break;
      default:
        return NextResponse.json(
          { error: `Template inconnu: '${templateName}'` },
          { status: 400 }
        );
    }

    // 2. Appel direct à l'API Rest de Resend (sans dépendance externe lourde)
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: Array.isArray(to) ? to : [to],
        subject: subject,
        html: htmlContent,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("❌ [Resend REST API Error]:", result);
      return NextResponse.json(
        { error: result.message || "Erreur lors de l'envoi de l'email" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email envoyé avec succès.",
      id: result.id,
    });

  } catch (error: any) {
    console.error("💥 [Send Email API Crash]:", error);
    return NextResponse.json(
      { error: error?.message || "Erreur interne du serveur lors de l'envoi de l'email." },
      { status: 500 }
    );
  }
}
