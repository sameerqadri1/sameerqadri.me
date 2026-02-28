import { Router } from 'express';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { loginSchema } from '../lib/shared.js';

export const authRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET ?? 'change-me-in-production';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH ?? '';

authRouter.post('/login', async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid body', details: parsed.error.flatten() },
      });
    }
    const { username, password } = parsed.data;

    if (username !== ADMIN_USERNAME) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid credentials' },
      });
    }

    if (!ADMIN_PASSWORD_HASH) {
      return res.status(503).json({
        success: false,
        error: { message: 'Server not configured: ADMIN_PASSWORD_HASH missing' },
      });
    }

    const match = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!match) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid credentials' },
      });
    }

    const secret = new TextEncoder().encode(JWT_SECRET);
    const token = await new SignJWT({ sub: username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);

    res.json({
      success: true,
      data: { token, username },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: { message: 'Login failed' },
    });
  }
});
