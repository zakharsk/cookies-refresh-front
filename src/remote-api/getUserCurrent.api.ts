'use server';

import { extractUserId } from '@/actions';
import { apiRequest } from '@/remote-api/request.api';
import { TUser } from '@/types';

export async function getUserCurrent() {
  const userId = await extractUserId();
  const res = await apiRequest<TUser>({
    path: `/users/${userId}`,
  });
  if (res.status === 200 && res.data) {
    return res.data as TUser;
  }
}
