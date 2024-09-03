'use server';

import { apiRequest } from '@/api/request.api';
import { TUser } from '@/types';

export async function getUsers() {
  const res = await apiRequest<TUser[]>({
    path: `/users`,
  });
  if (res.status === 200 && res.data) {
    return res.data as TUser[];
  }
}
