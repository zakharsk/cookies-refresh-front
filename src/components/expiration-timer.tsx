import ExpirationCounter from '@/components/expiration-counter';
import { accessTokenCookieName, refreshTokenCookieName } from '@/constants';
import { verifyToken } from '@/lib';

type ExpirationTimerProps = {
  name: string | undefined;
  token: string | undefined;
};

export default async function ExpirationTimer(props: ExpirationTimerProps) {
  if (!props.token) return <span>No token</span>;

  let jwtSecret = '';
  switch (props.name) {
    case accessTokenCookieName: {
      jwtSecret = process.env.ACCESS_JWT_SECRET as string;
      break;
    }
    case refreshTokenCookieName: {
      jwtSecret = process.env.REFRESH_JWT_SECRET as string;
      break;
    }
  }

  const payload = await verifyToken(props.token, jwtSecret);
  return <ExpirationCounter now={Date.now()} exp={payload?.exp as number} />;
}
