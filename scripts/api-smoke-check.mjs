#!/usr/bin/env node

const baseUrl = process.env.SMOKE_API_BASE_URL;
const adminUsername = process.env.SMOKE_ADMIN_USERNAME;
const adminPassword = process.env.SMOKE_ADMIN_PASSWORD;

if (!baseUrl) {
  console.error('Missing SMOKE_API_BASE_URL');
  process.exit(1);
}

const trimmedBase = baseUrl.replace(/\/$/, '');
const checks = [
  { name: 'health', method: 'GET', path: '/api/health' },
  { name: 'contact-invalid', method: 'POST', path: '/api/contact', body: {} },
  { name: 'upload-without-auth', method: 'POST', path: '/api/upload' },
];

function toText(status, body) {
  return `${status} ${typeof body === 'string' ? body.slice(0, 200) : JSON.stringify(body).slice(0, 200)}`;
}

for (const check of checks) {
  const res = await fetch(`${trimmedBase}${check.path}`, {
    method: check.method,
    headers: { 'Content-Type': 'application/json' },
    body: check.body ? JSON.stringify(check.body) : undefined,
  });

  let body;
  try {
    body = await res.json();
  } catch {
    body = await res.text();
  }

  const ok =
    check.name === 'health'
      ? res.status === 200
      : check.name === 'upload-without-auth'
        ? res.status === 401
      : res.status >= 400 && res.status < 500;

  if (!ok) {
    console.error(`FAIL ${check.name}: ${toText(res.status, body)}`);
    process.exit(1);
  }

  console.log(`PASS ${check.name}: ${toText(res.status, body)}`);
}

if (adminUsername && adminPassword) {
  const loginRes = await fetch(`${trimmedBase}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: adminUsername, password: adminPassword }),
  });

  const loginBody = await loginRes.json();
  if (loginRes.status !== 200 || !loginBody?.data?.token) {
    console.error(`FAIL admin-login: ${toText(loginRes.status, loginBody)}`);
    process.exit(1);
  }
  console.log(`PASS admin-login: ${toText(loginRes.status, loginBody)}`);

  const meRes = await fetch(`${trimmedBase}/api/admin/me`, {
    headers: { Authorization: `Bearer ${loginBody.data.token}` },
  });
  const meBody = await meRes.json();
  if (meRes.status !== 200) {
    console.error(`FAIL admin-me: ${toText(meRes.status, meBody)}`);
    process.exit(1);
  }
  console.log(`PASS admin-me: ${toText(meRes.status, meBody)}`);
} else {
  console.log('SKIP admin-login/admin-me: set SMOKE_ADMIN_USERNAME and SMOKE_ADMIN_PASSWORD to enable.');
}

console.log('Smoke checks completed successfully.');
