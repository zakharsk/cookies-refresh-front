'use server';
import { cookies } from 'next/headers';

import {
  accessTokenCookieName,
  refreshTokenCookieName,
} from '@/constants/cookies';
import { verifyToken } from '@/lib/verify-token';

export async function readTokensData() {
  const cookieStore = cookies();

  type TTokensData = {
    userId: string | undefined;
    accessTokenExpiresIn: number | undefined;
    refreshTokenExpiresIn: number | undefined;
  };

  const tokensData: TTokensData = {
    userId: undefined,
    accessTokenExpiresIn: 0,
    refreshTokenExpiresIn: 0,
  };

  const accessToken = cookieStore.get(accessTokenCookieName);
  if (accessToken && accessToken.value) {
    const payload = await verifyToken(
      accessToken.value,
      process.env.ACCESS_JWT_SECRET,
    );
    tokensData.userId = payload?.sub;
    tokensData.accessTokenExpiresIn = payload?.exp;
  }

  const refreshToken = cookieStore.get(refreshTokenCookieName);
  if (refreshToken && refreshToken.value) {
    const payload = await verifyToken(
      refreshToken.value,
      process.env.REFRESH_JWT_SECRET,
    );

    if (!tokensData.userId) {
      tokensData.userId = payload?.sub;
    }
    tokensData.refreshTokenExpiresIn = payload?.exp;
  }

  return tokensData;
}
