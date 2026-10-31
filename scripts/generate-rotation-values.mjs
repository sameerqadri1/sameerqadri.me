#!/usr/bin/env node

import { randomBytes } from 'crypto';

const jwtSecret = randomBytes(48).toString('base64url');

console.log('# Generated Rotation Values');
console.log('');
console.log('JWT_SECRET=' + jwtSecret);
console.log('');
console.log('Next: generate ADMIN_PASSWORD_HASH from your new admin password:');
console.log('node -e "require(\'bcryptjs\').hash(process.argv[1], 10).then(h => console.log(h))" "your-new-password"');
