import { Router } from 'express';
import { z } from 'zod';
import { Resend } from 'resend';

export const contactRouter = Router();

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  company: z.string().max(200).optional(),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
  projectType: z.string().max(200).optional(),
  timeline: z.string().max(200).optional(),
  budgetRange: z.string().max(200).optional(),
  projectStage: z.string().max(200).optional(),
});

contactRouter.post('/', async (req, res) => {
  try {
    const { recaptchaToken, ...body } = (req.body ?? {}) as {
      recaptchaToken?: string | null;
      name?: unknown;
      company?: unknown;
      email?: unknown;
      message?: unknown;
      projectType?: unknown;
      timeline?: unknown;
      budgetRange?: unknown;
      projectStage?: unknown;
    };

    if (RECAPTCHA_SECRET_KEY) {
      if (!recaptchaToken || typeof recaptchaToken !== 'string') {
        return res.status(400).json({
          success: false,
          error: { message: 'reCAPTCHA token missing. Please try again.' },
        });
      }
      try {
        const params = new URLSearchParams();
        params.set('secret', RECAPTCHA_SECRET_KEY);
        params.set('response', recaptchaToken);
        const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
        });
        const verifyJson = (await verifyRes.json()) as { success: boolean; ['error-codes']?: string[] };
        if (!verifyJson.success) {
          console.error('reCAPTCHA failed', verifyJson['error-codes']);
          return res.status(400).json({
            success: false,
            error: { message: 'reCAPTCHA validation failed. Please try again.' },
          });
        }
      } catch (err) {
        console.error('reCAPTCHA verification error:', err);
        return res.status(400).json({
          success: false,
          error: { message: 'reCAPTCHA validation failed. Please try again.' },
        });
      }
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid form data', details: parsed.error.flatten() },
      });
    }

    const { name, company, email, message, projectType, timeline, budgetRange, projectStage } =
      parsed.data;

    console.log('\n📩  New contact submission:');
    console.log(`   Name:    ${name}`);
    console.log(`   Company: ${company ?? '—'}`);
    console.log(`   Email:   ${email}`);
    console.log(`   Message: ${message.slice(0, 120)}${message.length > 120 ? '…' : ''}`);
    if (projectType || timeline || budgetRange || projectStage) {
      console.log('   Project details:');
      console.log(`     Type:   ${projectType ?? '—'}`);
      console.log(`     When:   ${timeline ?? '—'}`);
      console.log(`     Budget: ${budgetRange ?? '—'}`);
      console.log(`     Stage:  ${projectStage ?? '—'}`);
    }
    console.log('');

    // Send email via Resend if API key is configured
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'sameerkhan8701@gmail.com';

    if (RESEND_API_KEY) {
      try {
        const resend = new Resend(RESEND_API_KEY);
        await resend.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: TO_EMAIL,
          replyTo: email,
          subject: `New inquiry from ${name}${company ? ` (${company})` : ''}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
              <h2 style="color:#7c3aed">New Portfolio Inquiry</h2>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;color:#6b7280;width:120px"><strong>Name</strong></td><td style="padding:8px 0">${name}</td></tr>
                ${company ? `<tr><td style="padding:8px 0;color:#6b7280"><strong>Company</strong></td><td style="padding:8px 0">${company}</td></tr>` : ''}
                <tr><td style="padding:8px 0;color:#6b7280"><strong>Email</strong></td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
              </table>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
              ${
                projectType || timeline || budgetRange || projectStage
                  ? `<p style="color:#6b7280;font-size:13px;margin-bottom:8px"><strong>Project details:</strong></p>
              <ul style="color:#111827;font-size:13px;padding-left:18px;margin:0 0 12px 0">
                ${
                  projectType
                    ? `<li><strong>Type:</strong> ${projectType}</li>`
                    : ''
                }
                ${
                  timeline
                    ? `<li><strong>Timeline:</strong> ${timeline}</li>`
                    : ''
                }
                ${
                  budgetRange
                    ? `<li><strong>Budget:</strong> ${budgetRange}</li>`
                    : ''
                }
                ${
                  projectStage
                    ? `<li><strong>Stage:</strong> ${projectStage}</li>`
                    : ''
                }
              </ul>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>`
                  : ''
              }
              <p style="color:#6b7280;font-size:13px;margin-bottom:8px"><strong>Message:</strong></p>
              <p style="white-space:pre-wrap;color:#111827">${message}</p>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
              <p style="color:#9ca3af;font-size:12px">Sent from your portfolio contact form</p>
            </div>
          `,
        });
        console.log('✉️  Email sent via Resend to', TO_EMAIL);
      } catch (emailErr) {
        // Email failure is non-fatal — still confirm to sender
        console.error('Resend email error:', emailErr);
      }
    } else {
      console.log('ℹ️  RESEND_API_KEY not set — email notification skipped.');
    }

    res.json({
      success: true,
      data: { message: 'Message received. I will be in touch within 12 hours.' },
    });
  } catch (e) {
    console.error('Contact submission error:', e);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to send message. Please try again.' },
    });
  }
});
