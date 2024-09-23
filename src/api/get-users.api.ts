import { apiRequest } from '@/api/request.api';
import { TUser } from '@/types/user.type';

export async function getUsers() {
  const res = await apiRequest<TUser[]>({
    path: `/users`,
    includeAccessToken: true,
  });
  if (res.status === 200 && res.data) {
    return res.data as TUser[];
  }
}
