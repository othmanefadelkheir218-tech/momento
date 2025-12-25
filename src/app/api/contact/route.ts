
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cooperation, city, name, phone, email, message } = body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "zakariyazouazou@gmail.com",
        pass: "fpzp hdkz owpv ibxt" //process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "zakariyazouazou@gmail.com",
      to: "zoizouzakaria32@gmail.com",
      subject: cooperation ? `New Contact Form Submission: ${cooperation}` : 'New Newsletter Subscription',
      text: cooperation ? `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        City: ${city}
        Cooperation Type: ${cooperation}
        
        Message:
        ${message}
      ` : `New Newsletter Subscription from: ${email}`,
      html: cooperation ? `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Cooperation Type:</strong> ${cooperation}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      ` : `<h3>New Newsletter Subscription</h3><p><strong>Email:</strong> ${email}</p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
