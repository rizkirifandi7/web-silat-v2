import { NextResponse } from "next/server";
import { Resend } from "resend";

// Menggunakan API Key dari .env (bisa berupa RESEND_API_KEY)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validasi field
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 },
      );
    }

    // Mengirim email menggunakan Resend
    const data = await resend.emails.send({
      // "onboarding@resend.dev" hanya untuk testing jika domain belum diverifikasi di Resend.
      // Jika domain sudah terverifikasi, ganti "onboarding@resend.dev" menjadi email domain Anda, ex: "info@domainanda.com".
      from: "Website Kontak <onboarding@resend.dev>",

      // GANTI EMAIL INI dengan email Anda yang akan menerima pesan dari pengunjung website,
      // JIKA MASIH MENGGUNAKAN ONBOARDING, email to ini WAJIB EMAIL YANG TERDAFTAR DI AKUN RESEND ANDA:
      to: ["rizki.rifandi5@gmail.com"],

      subject: `${subject}`,
      reply_to: email, // Jika Anda membalas email, otomatis membalas ke email pengunjung
      html: `
        <h2>Pesan Baru dari Form Kontak Website Anda</h2>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subjek:</strong> ${subject}</p>
        <p><strong>Pesan:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
