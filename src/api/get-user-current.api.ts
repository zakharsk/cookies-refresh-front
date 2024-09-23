import { extractUserId } from '@/actions/extract-user-id.action';
import { apiRequest } from '@/api/request.api';
import { TCurrentUser } from '@/types/user.type';

export async function getUserCurrent() {
  const userId = await extractUserId();
  if (!userId) return;

  const userRes = await apiRequest<TCurrentUser>({
    path: `/users/${userId}`,
    includeAccessToken: true,
  });

  if (userRes.status === 200 && userRes.data) {
    return userRes.data as TCurrentUser;
  }
}
