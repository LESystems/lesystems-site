import { email, whatsappLink } from "../../data";
type Payload = { name?: string; company?: string; email?: string; phone?: string; interest?: string; message?: string; type?: string };
export async function POST(request: Request) {
  const body = await request.json() as Payload;
  if (!body.name || !body.email || !body.phone || !body.message) return Response.json({ error: "Campos obrigatórios ausentes." }, { status: 400 });
  const subject = `[LESystems] ${body.type || "Novo contato"}: ${body.interest || "Solicitação"}`;
  const text = `Nome: ${body.name}\nEmpresa: ${body.company || "Não informada"}\nE-mail: ${body.email}\nWhatsApp: ${body.phone}\nInteresse: ${body.interest || "Não informado"}\n\nMensagem:\n${body.message}`;
  let delivered = false;
  if (process.env.RESEND_API_KEY) {
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.CONTACT_FROM_EMAIL || "LESystems Site <onboarding@resend.dev>", to: [process.env.CONTACT_TO_EMAIL || email], reply_to: body.email, subject, text }) });
    delivered = response.ok;
  }
  return Response.json({ delivered, whatsapp: whatsappLink(`Olá, sou ${body.name}${body.company ? ` da ${body.company}` : ""}. Interesse: ${body.interest || "solução digital"}.\n\n${body.message}`), mailto: `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}` });
}
