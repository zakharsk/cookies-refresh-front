'use server';

import { cookies } from 'next/headers';

import {
  accessTokenCookieName,
  refreshTokenCookieName,
} from '@/constants/cookies';

export async function deleteCookies() {
  const cookieStore = cookies();
  cookieStore.delete(refreshTokenCookieName);
  cookieStore.delete(accessTokenCookieName);
}
