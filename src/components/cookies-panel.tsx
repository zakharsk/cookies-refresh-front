import { cookies } from 'next/headers';

import DeleteTokenButton from '@/components/delete-token-button';
import ExpirationTimer from '@/components/expiration-timer';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { accessTokenCookieName, refreshTokenCookieName } from '@/constants';

export default function CookiesPanel() {
  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get(accessTokenCookieName);
  const refreshTokenCookie = cookieStore.get(refreshTokenCookieName);

  const isAccessTokenExist = !!accessTokenCookie?.value;
  const isRefreshTokenExist = !!refreshTokenCookie?.value;
  return (
    <Table>
      <TableCaption>Current cookies</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">In browser</TableHead>
          <TableHead className="text-center">Expires in</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="text-center">{accessTokenCookieName}</TableCell>
          <TableCell className="text-center">
            {isAccessTokenExist ? <span>&#9989;</span> : <span>&#10060;</span>}
          </TableCell>
          <TableCell className="text-center">
            <ExpirationTimer
              name={accessTokenCookie?.name}
              token={accessTokenCookie?.value}
            />
          </TableCell>
          <TableCell className="text-center">
            <DeleteTokenButton
              cookieName={accessTokenCookieName}
              disabled={!isAccessTokenExist}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-center">
            {refreshTokenCookieName}
          </TableCell>
          <TableCell className="text-center">
            {isRefreshTokenExist ? <span>&#9989;</span> : <span>&#10060;</span>}
          </TableCell>
          <TableCell className="text-center">
            <ExpirationTimer
              name={refreshTokenCookie?.name}
              token={refreshTokenCookie?.value}
            />
          </TableCell>
          <TableCell className="text-center">
            <DeleteTokenButton
              cookieName={refreshTokenCookieName}
              disabled={!isRefreshTokenExist}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
