'use server';
import { jwtVerify } from 'jose/jwt/verify';
import { cookies } from 'next/headers';

import { accessTokenCookieName, refreshTokenCookieName } from '@/constants';

async function verifyToken(jwt: string, jwtSecret: string | undefined) {
  if (!jwtSecret) return;
  const secret = new TextEncoder().encode(jwtSecret);
  const { payload } = await jwtVerify(jwt, secret);
  return payload;
}

export async function extractUserId() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get(accessTokenCookieName);
  if (accessToken && accessToken.value) {
    const payload = await verifyToken(
      accessToken.value,
      process.env.ACCESS_JWT_SECRET,
    );
    return payload?.sub;
  }

  const refreshToken = cookieStore.get(refreshTokenCookieName);
  if (refreshToken && refreshToken.value) {
    const payload = await verifyToken(
      refreshToken.value,
      process.env.REFRESH_JWT_SECRET,
    );
    return payload?.sub;
  }
}
