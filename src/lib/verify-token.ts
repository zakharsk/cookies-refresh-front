'use server';

import { jwtVerify } from 'jose/jwt/verify';

export async function verifyToken(jwt: string, jwtSecret: string | undefined) {
  if (!jwtSecret) return;
  const secret = new TextEncoder().encode(jwtSecret);
  const { payload } = await jwtVerify(jwt, secret);
  return payload;
}
