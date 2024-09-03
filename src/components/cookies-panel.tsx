import { cookies } from 'next/headers';

import ExpireButton from '@/components/expire-button';
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
          <TableHead className="text-center">Status</TableHead>
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
            <ExpireButton
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
            <ExpireButton
              cookieName={refreshTokenCookieName}
              disabled={!isRefreshTokenExist}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
