import { extractUserId } from '@/actions/extract-user-id.action';
import { apiRequest } from '@/api/request.api';

export async function deleteUserCurrent() {
  const userId = await extractUserId();
  return apiRequest<null>({
    method: 'DELETE',
    path: `/users/${userId}`,
    includeAccessToken: true,
  });
}
