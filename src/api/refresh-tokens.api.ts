'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { deleteTokensCookie } from '@/actions/delete-tokens-cookie.action';
import { apiRequest } from '@/api/request.api';

export async function refreshTokens() {
  const refreshRes = await apiRequest({
    method: 'PATCH',
    path: '/tokens',
    includeRefreshToken: true,
  });

  switch (refreshRes.status) {
    case 200:
      const cookieStore = cookies();
      refreshRes.cookies.forEach((cookie) => {
        cookieStore.set(cookie);
      });

      revalidatePath('/');
      return true;
    default:
      await deleteTokensCookie();
      return false;
  }
}
