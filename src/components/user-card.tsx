import { ExitIcon } from '@radix-ui/react-icons';

import { getUserCurrent } from '@/api';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function UserCard() {
  const user = await getUserCurrent();
  if (!user) return;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.login}</CardTitle>
        <CardDescription>
          The data was just retrieved from the server using AccessToken.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {Object.keys(user).map((key, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex size-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="break-all text-sm font-medium leading-none">
                  {user[key as keyof typeof user]}
                </p>
                <p className="text-sm text-muted-foreground">{key}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <ExitIcon className="mr-2 size-4" /> Log out
        </Button>
      </CardFooter>
    </Card>
  );
}
