'use server';
import { cookies } from 'next/headers';

import { accessTokenCookieName, refreshTokenCookieName } from '@/constants';
import { verifyToken } from '@/lib';

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
