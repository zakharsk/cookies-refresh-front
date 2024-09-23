import { apiRequest } from '@/api/request.api';
import { TCurrentUser } from '@/types/user.type';

export async function getUserById(userId: string | undefined) {
  if (!userId) {
    return;
  }

  const userRes = await apiRequest<TCurrentUser>({
    path: `/users/${userId}`,
    includeAccessToken: true,
  });

  if (userRes.status === 200 && userRes.data) {
    return userRes.data as TCurrentUser;
  }
}
