import { Router } from 'express';
import { z } from 'zod';

export const contactRouter = Router();

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  company: z.string().max(200).optional(),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
});

contactRouter.post('/', async (req, res) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid form data', details: parsed.error.flatten() },
      });
    }

    const { name, company, email, message } = parsed.data;

    // Log to console so you can see submissions in server output
    console.log('\n📩  New contact submission:');
    console.log(`   Name:    ${name}`);
    console.log(`   Company: ${company ?? '—'}`);
    console.log(`   Email:   ${email}`);
    console.log(`   Message: ${message.slice(0, 120)}${message.length > 120 ? '…' : ''}\n`);

    // TODO: Add email delivery here when ready (e.g. Resend, SendGrid, Nodemailer)
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'Portfolio <noreply@sameerqadri.me>',
    //   to: 'sameerkhan8701@gmail.com',
    //   subject: `New inquiry from ${name}`,
    //   html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
    // });

    res.json({
      success: true,
      data: { message: 'Message received. We will be in touch within 12 hours.' },
    });
  } catch (e) {
    console.error('Contact submission error:', e);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to send message. Please try again.' },
    });
  }
});
