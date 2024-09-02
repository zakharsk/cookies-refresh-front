import { Fragment, ReactNode } from 'react';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>;
}
