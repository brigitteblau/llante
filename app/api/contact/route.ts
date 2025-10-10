import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { ContactSchema } from "@/lib/validation";
import { resend, FROM, TO } from "@/lib/mail";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid" }, { status: 400 });
    }
    const { name, email, phone, message, locale, website } = parsed.data;


    if (website && website.trim() !== "") {
      return NextResponse.json({ ok: true }); 
    }

    // Guardar en DB
    const rows = await sql<
      { id: string }[]
    >`insert into contacts (name,email,phone,message,locale) values (${name},${email},${phone||null},${message},${locale||'es'}) returning id`;

    // Notificar por mail
    await resend.emails.send({
      from: FROM,
      to: [TO],
      subject: "Tenemos un posible cliente en Llante",
      html: `
        <h2>Nuevo contacto</h2>
        <p><b>Nombre:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Tel:</b> ${phone||"-"}</p>
        <p><b>Mensaje:</b><br/>${(message||"").replace(/\n/g,"<br/>")}</p>
        <p><small>ID: ${rows[0].id}</small></p>
      `
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
