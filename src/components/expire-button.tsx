'use client';

import { TrashIcon } from '@radix-ui/react-icons';

import { expireCookie } from '@/actions';
import { Button } from '@/components/ui/button';

type TExpireButtonProps = {
  cookieName: string;
  disabled: boolean;
};

export default function ExpireButton(props: TExpireButtonProps) {
  const onExpireButtonClick = async () => {
    await expireCookie(props.cookieName);
  };
  return (
    <Button onClick={onExpireButtonClick} disabled={props.disabled}>
      <TrashIcon className="mr-2 size-4" /> Expire
    </Button>
  );
}
