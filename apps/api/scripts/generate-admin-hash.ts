/**
 * Run this to generate a bcrypt hash for your admin password.
 * Usage:  npx tsx scripts/generate-admin-hash.ts
 *
 * Copy the printed hash into your .env as ADMIN_PASSWORD_HASH=<hash>
 */
import bcryptjs from 'bcryptjs';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the password you want to use for admin login: ', async (password) => {
  rl.close();
  if (!password || password.length < 8) {
    console.error('❌  Password must be at least 8 characters.');
    process.exit(1);
  }
  const hash = await bcryptjs.hash(password, 10);
  console.log('\n✅  Password hash generated. Add this to your apps/api/.env:\n');
  console.log(`ADMIN_PASSWORD_HASH="${hash}"\n`);
});
