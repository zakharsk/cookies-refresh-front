'use client';

import { ExitIcon } from '@radix-ui/react-icons';
import { useTransition } from 'react';

import { logOut } from '@/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TCurrentUser } from '@/types';

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

  return props.user ? (
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
      <CardFooter>
        <Button className="w-full" disabled={isPending} onClick={onLogOut}>
          <ExitIcon className="mr-2 size-4" /> Log out
        </Button>
      </CardFooter>
    </Card>
  ) : null;
}
