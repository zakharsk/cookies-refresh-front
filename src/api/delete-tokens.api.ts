import { apiRequest } from '@/api/request.api';

export async function deleteTokens() {
  return apiRequest({
    method: 'DELETE',
    path: '/tokens',
  });
}
