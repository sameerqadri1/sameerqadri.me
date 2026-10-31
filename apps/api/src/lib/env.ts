const isProduction = process.env.NODE_ENV === 'production';

export function getJwtSecret(): string {
  const jwtSecret = process.env.JWT_SECRET;
  if (jwtSecret) return jwtSecret;

  if (isProduction) {
    throw new Error('JWT_SECRET must be set in production');
  }

  // Local fallback only to keep dev onboarding simple.
  return 'dev-only-jwt-secret-change-me';
}

export function validateProductionEnv(): void {
  if (!isProduction) return;

  const required = ['DATABASE_URL', 'JWT_SECRET', 'ADMIN_PASSWORD_HASH'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required production environment variables: ${missing.join(', ')}`
    );
  }
}
