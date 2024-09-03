'use server';

import { apiRequest } from '@/api';
import { LoginFormSchema } from '@/schemas';

export async function submitLoginForm(formData: LoginFormSchema) {
  formData.login = encodeURIComponent(formData.login);
  formData.password = encodeURIComponent(formData.password);
  const jsonString = JSON.stringify(formData);
  const b64String = btoa(jsonString);
  return apiRequest<null>({
    path: '/tokens',
    bearerToken: b64String,
  });
}
