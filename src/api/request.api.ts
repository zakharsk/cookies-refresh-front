import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

import {
  accessTokenCookieName,
  refreshTokenCookieName,
} from '@/constants/cookies';
import { parseCookie } from '@/lib/cookie-parser';
import { TApiRequest } from '@/types/api-request.type';
import { TApiResponse } from '@/types/api-response.type';

export async function apiRequest<T>(params: TApiRequest) {
  // Build API URI
  const apiHost = process.env.API_HOST;
  const apiPrefix = process.env.API_URL_PREFIX || '';
  const apiVersion = params.version || process.env.API_DEFAULT_VERSION;

  const requestUrl = `${apiHost}${apiPrefix}/v${apiVersion}${params.path}`;
  const method = params.method || 'GET';

  // Build request with params
  const request = new NextRequest(requestUrl, {
    method,
    credentials: 'include',
  });
  if (params.bearerToken) {
    request.headers.set('Authorization', `Bearer ${params.bearerToken}`);
  }

  if (params.includeAccessToken || params.includeRefreshToken) {
    const cookieStore = cookies();

    if (params.includeAccessToken) {
      const accessTokenCookie = cookieStore.get(accessTokenCookieName);
      if (accessTokenCookie) {
        request.cookies.set(accessTokenCookie.name, accessTokenCookie.value);
      }
    }

    if (params.includeRefreshToken) {
      const refreshTokenCookie = cookieStore.get(refreshTokenCookieName);
      if (refreshTokenCookie) {
        request.cookies.set(refreshTokenCookie.name, refreshTokenCookie.value);
      }
    }
  }

  // Make request
  const apiResponse: TApiResponse<T> = {
    status: 0,
    data: null,
    cookies: [],
  };

  try {
    const response = await fetch(request, { cache: 'no-store' });

    // Read cookies from server
    const setCookieHeaders = response.headers.getSetCookie();
    if (setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((setCookieHeader) => {
        const cookie = parseCookie(setCookieHeader);
        if (cookie) apiResponse.cookies.push(cookie);
      });
    }

    // Read response status
    apiResponse.status = response.status;

    // Read content
    const contentTypeHeader = response.headers.get('Content-Type');
    if (contentTypeHeader && contentTypeHeader.includes('application/json')) {
      apiResponse.data = (await response.json()) as T;
    }
  } catch (err) {
    const error = err as Error;
    apiResponse.data = {
      message: error.message,
      statusCode: 0,
    };
  }

  return apiResponse;
}
