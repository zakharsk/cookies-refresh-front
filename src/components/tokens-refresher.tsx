'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { readTokensData } from '@/actions/read-tokens-data';
import { refreshTokens } from '@/api/refresh-tokens.api';

export function TokenRefresher() {
  const router = useRouter();
  const tokensCheckInterval = 1000 * 10; // Check every 10 seconds

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
          isExpiringSoon || refreshTokenLifetime < tokensCheckInterval * 2;
      }

      if (isExpiringSoon) {
        const success = await refreshTokens();
        if (success) {
          router.refresh();
        } else {
          router.push('/login');
        }
      }
    };

    const intervalId = setInterval(checkTokenExpiration, tokensCheckInterval);

    return () => clearInterval(intervalId);
  }, [router, tokensCheckInterval]);

  return null;
}
