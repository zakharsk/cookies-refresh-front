'use server';

import { cookies } from 'next/headers';

import { accessTokenCookieName, refreshTokenCookieName } from '@/constants';

export async function deleteCookies() {
  const cookieStore = cookies();
  cookieStore.delete(refreshTokenCookieName);
  cookieStore.delete(accessTokenCookieName);
}
