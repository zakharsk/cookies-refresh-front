import { NextRequest, NextResponse } from 'next/server';

import { accessTokenCookieName, refreshTokenCookieName } from '@/constants';
import { parseCookie } from '@/lib';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  const accessTokenCookie = request.cookies.get(accessTokenCookieName);
  const refreshTokenCookie = request.cookies.get(refreshTokenCookieName);
  if (accessTokenCookie?.value && refreshTokenCookie?.value) {
    return NextResponse.next();
  }

  if (refreshTokenCookie?.value) {
    console.log('middleware:', 'Refresh!');
    const apiHost = process.env.API_HOST;
    const apiVersion = process.env.API_DEFAULT_VERSION;
    const requestUrl = `${apiHost}/v${apiVersion}/tokens`;

    const response = NextResponse.next({ request: request });

    const refreshRequest = new NextRequest(requestUrl, { method: 'PATCH' });
    refreshRequest.cookies.set(
      refreshTokenCookieName,
      refreshTokenCookie.value,
    );

    const refreshResponse = await fetch(refreshRequest);
    refreshResponse.headers.getSetCookie().forEach((cookieString) => {
      const cookie = parseCookie(cookieString);
      if (cookie) {
        response.cookies.set(cookie);
      }
    });

    return response;
  }
  return NextResponse.next();
}
