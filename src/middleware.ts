import { NextRequest, NextResponse } from 'next/server';

import { accessTokenCookieName, refreshTokenCookieName } from '@/constants';
import { parseCookie } from '@/lib';

export async function middleware(originalRequest: NextRequest) {
  const originalResponse = NextResponse.next({
    request: originalRequest,
  });

  if (
    originalRequest.nextUrl.pathname.match(
      '\\/((api|_next\\/static|_next\\/image|favicon\\.ico|sitemap\\.xml|robots\\.txt).*)',
    )
  ) {
    // console.log(
    //   'Middleware:',
    //   'Internal Next.js request. Returning the original response unchanged.',
    //   originalRequest.nextUrl.pathname,
    // );
    return originalResponse;
  }

  const accessTokenCookie = originalRequest.cookies.get(accessTokenCookieName);
  const refreshTokenCookie = originalRequest.cookies.get(
    refreshTokenCookieName,
  );

  if (!refreshTokenCookie?.value) {
    // console.log(
    //   'Middleware:',
    //   'There is no Refresh token in the request. Returning the original response unchanged.',
    // );
    return originalResponse;
  }

  if (!accessTokenCookie?.value) {
    // console.log('Middleware:', 'The tokens need to be refreshed!');
    const apiHost = process.env.API_HOST;
    const apiPrefix = process.env.API_URL_PREFIX || '';
    const apiVersion = process.env.API_DEFAULT_VERSION;
    const refreshRequestUrl = `${apiHost}${apiPrefix}/v${apiVersion}/tokens`;

    const refreshRequest = new NextRequest(refreshRequestUrl, {
      method: 'PATCH',
    });
    refreshRequest.cookies.set(
      refreshTokenCookieName,
      refreshTokenCookie.value,
    );

    // console.log('Middleware:', 'Sending refresh request.');
    const refreshResponse = await fetch(refreshRequest);

    if (refreshResponse.status === 200) {
      refreshResponse.headers.getSetCookie().forEach((cookieString) => {
        const cookie = parseCookie(cookieString);
        if (cookie) {
          // console.log(
          //   'Middleware:',
          //   `Attaching ${cookie.name} cookie to the original response.`,
          // );
          originalResponse.cookies.set(cookie);
        }
      });
    } else if (refreshResponse.status === 401) {
      // console.log(
      //   'Middleware:',
      //   'Invalid RefreshToken. Deleting RefreshToken cookie.',
      // );
      originalResponse.cookies.delete(refreshTokenCookieName);
    } else {
      console.log(
        'Middleware:',
        `An unexpected response to refresh request: ${refreshResponse.status}`,
      );
    }
  }
  return originalResponse;
}
