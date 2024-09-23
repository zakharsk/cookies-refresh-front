'use client';

import { ExitIcon, TrashIcon } from '@radix-ui/react-icons';
import { useTransition } from 'react';

import { deleteUser } from '@/actions/delete-user-button.action';
import { logOut } from '@/actions/log-out-button.action';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TCurrentUser } from '@/types/user.type';

type TUserCardProps = {
  user: TCurrentUser;
};

export default function UserCard(props: TUserCardProps) {
  const [isPending, startTransition] = useTransition();

  const onLogOut = () => {
    startTransition(async () => {
      await logOut();
    });
  };

  const onDelete = () => {
    startTransition(async () => {
      await deleteUser();
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.user.login}</CardTitle>
        <CardDescription>
          The data was just retrieved from the server using AccessToken.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {Object.keys(props.user).map((key, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex size-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="break-all text-sm font-medium leading-none">
                  {props.user[key as keyof typeof props.user]}
                </p>
                <p className="text-sm text-muted-foreground">{key}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className={'flex flex-col gap-2'}>
        <Button className="w-full" disabled={isPending} onClick={onLogOut}>
          <ExitIcon className="mr-2 size-4" /> Log out
        </Button>
        <Button
          className="w-full"
          variant={'destructive'}
          disabled={isPending}
          onClick={onDelete}
        >
          <TrashIcon className="mr-2 size-4" /> Delete user
        </Button>
      </CardFooter>
    </Card>
  );
}
