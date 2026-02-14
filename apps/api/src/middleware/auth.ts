import type { Request, Response, NextFunction } from 'express';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET ?? 'change-me-in-production';

export interface AuthPayload {
  sub: string;
  iat?: number;
  exp?: number;
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: { message: 'Missing or invalid Authorization header' },
    });
    return;
  }
  const token = header.slice(7);
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    (req as Request & { auth?: AuthPayload }).auth = payload as AuthPayload;
    next();
  } catch {
    res.status(401).json({
      success: false,
      error: { message: 'Invalid or expired token' },
    });
  }
}
