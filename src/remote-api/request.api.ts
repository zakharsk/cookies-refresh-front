'use server';

import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { parseCookie } from '@/lib';
import { TApiRequest, TApiResponse } from '@/types';
import { accessTokenCookieName, refreshTokenCookieName } from '@/constants';

export async function apiRequest<T>(params: TApiRequest) {
  const apiHost = process.env.API_HOST;
  const apiVersion = params.version || process.env.API_DEFAULT_VERSION;

  const requestUrl = `${apiHost}/v${apiVersion}${params.path}`;
  const method = params.method || 'GET';

  const request = new NextRequest(requestUrl, {
    method,
    credentials: 'include',
  });
  if (params.bearerToken) {
    request.headers.set('Authorization', `Bearer ${params.bearerToken}`);
  }

  const cookieStore = cookies();
  const accessToken = cookieStore.get(accessTokenCookieName);
  if (accessToken && accessToken.value) {
    request.cookies.set(accessTokenCookieName, accessToken.value);
  }

  if (params.refresh) {
    const refreshToken = cookieStore.get(refreshTokenCookieName);
    if (refreshToken && refreshToken.value) {
      request.cookies.set(refreshTokenCookieName, refreshToken.value);
    }
  }

  let apiResponse: TApiResponse<T> = {
    status: 0,
    data: null,
  };

  try {
    const response = await fetch(request);
    const setCookieHeaders = response.headers.getSetCookie();

    if (setCookieHeaders.length > 0) {
      const cookieStore = cookies();

      setCookieHeaders.forEach((setCookieHeader) => {
        const cookie = parseCookie(setCookieHeader);
        if (cookie) cookieStore.set(cookie);
      });
    }

    apiResponse.status = response.status;

    const contentTypeHeader = response.headers.get('Content-Type');
    if (contentTypeHeader && contentTypeHeader.includes('application/json')) {
      apiResponse.data = (await response.json()) as T;
    }
  } catch (err: any) {
    console.error('Remote API request:', err.message);
    apiResponse.data = {
      message: err.message,
      statusCode: 0,
    };
  }

  return apiResponse;
}
