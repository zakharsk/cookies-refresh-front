'use client';

import { TrashIcon } from '@radix-ui/react-icons';

import { expireCookie } from '@/actions/expire-cookie.action';
import { Button } from '@/components/ui/button';

type TExpireButtonProps = {
  cookieName: string;
  disabled: boolean;
};

export default function DeleteTokenButton(props: TExpireButtonProps) {
  const onExpireButtonClick = async () => {
    await expireCookie(props.cookieName);
  };
  return (
    <Button onClick={onExpireButtonClick} disabled={props.disabled}>
      <TrashIcon className="mr-2 size-4" /> Delete
    </Button>
  );
}
