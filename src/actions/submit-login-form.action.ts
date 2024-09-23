'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { apiRequest } from '@/api/request.api';

export async function submitLoginForm(
  prevState: {
    message: string | undefined;
  },
  formData: FormData,
) {
  const rawFormData = {
    login: formData.get('login'),
    password: formData.get('password'),
  };

  rawFormData.login = encodeURIComponent(`${rawFormData.login}`);
  rawFormData.password = encodeURIComponent(`${rawFormData.password}`);
  const jsonString = JSON.stringify(rawFormData);
  const b64String = btoa(jsonString);

  const loginRes = await apiRequest<null>({
    path: '/tokens',
    bearerToken: b64String,
  });

  switch (loginRes.status) {
    case 502:
      prevState.message = 'Server is unavailable. Try again later.';
      break;

    case 401:
      prevState.message = 'Wrong username or password';
      break;

    case 200:
      const cookieStore = cookies();
      loginRes.cookies.forEach((cookie) => {
        cookieStore.set(cookie);
      });
      redirect('/account');
  }

  return prevState;
}
