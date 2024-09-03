'use server';

import { extractUserId } from '@/actions';
import { apiRequest } from '@/api/request.api';
import { TCurrentUser } from '@/types';

export async function getUserCurrent() {
  const userId = await extractUserId();
  const res = await apiRequest<TCurrentUser>({
    path: `/users/${userId}`,
  });
  if (res.status === 200 && res.data) {
    return res.data as TCurrentUser;
  }
}
