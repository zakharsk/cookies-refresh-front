'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { readTokensData } from '@/actions/read-tokens-data';
import { refreshTokens } from '@/api/refresh-tokens.api';

export function TokenRefresher() {
  const router = useRouter();
  const tokensCheckInterval =
    parseInt(
      process.env.NEXT_PUBLIC_TOKENS_REFRESHER_INTERVAL_IN_SEC as string,
    ) * 1000;
  const pathname = usePathname();

  useEffect(() => {
    const checkTokenExpiration = async () => {
      let isExpiringSoon = false;

      const { accessTokenExpiresIn, refreshTokenExpiresIn } =
        await readTokensData();

      const now = Date.now();

      if (accessTokenExpiresIn) {
        const accessTokenDate = new Date(accessTokenExpiresIn * 1000).getTime();
        const accessTokenLifetime = accessTokenDate - now;
        isExpiringSoon =
          isExpiringSoon || accessTokenLifetime < tokensCheckInterval * 2;
      }

      if (refreshTokenExpiresIn) {
        const refreshTokenDate = new Date(
          refreshTokenExpiresIn * 1000,
        ).getTime();
        const refreshTokenLifetime = refreshTokenDate - now;
        isExpiringSoon =
          isExpiringSoon ||
          !accessTokenExpiresIn ||
          refreshTokenLifetime < tokensCheckInterval * 2;
      }

      if (isExpiringSoon) {
        const success = await refreshTokens();
        if (success) {
          if (pathname === '/login') {
            router.push('/account');
          } else {
            router.refresh();
          }
        } else {
          router.push('/login');
        }
      }
    };

    checkTokenExpiration().finally();

    const intervalId = setInterval(checkTokenExpiration, tokensCheckInterval);

    return () => clearInterval(intervalId);
  }, [pathname, router, tokensCheckInterval]);

  return null;
}
