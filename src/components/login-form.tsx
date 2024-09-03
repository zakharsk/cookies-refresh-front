'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { EnterIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { submitLoginForm } from '@/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { LoginFormSchema, loginFormSchema } from '@/schemas';

export function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const [timer, setTimer] = useState<number>(0);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;
    if (isStarted) {
      intervalId = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    if (timer === 3) {
      toast({
        title: 'It seems the server is unavailable',
        description: `It's been ${timer} seconds since you clicked Login.
            It seems that the API server was down for a period of inactivity.
            Hosting is preempting that "Your free instance will spin down with
            inactivity, which can delay requests by 50 seconds or more.". If
            nothing changes after 60 seconds, please let me know.`,
        action: (
          <ToastAction altText="GitHub">
            <Link
              href={'https://github.com/zakharsk/cookies-refresh-front.git'}
            >
              GitHub
            </Link>
          </ToastAction>
        ),
      });
    }

    return () => clearInterval(intervalId);
  }, [timer, isStarted, toast]);

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginFormSchema) {
    setIsStarted(true);
    startTransition(async () => {
      const res = await submitLoginForm(values);
      if (res.status === 200) router.push('/account');
      if (res.status === 401) {
        toast({
          variant: 'destructive',
          title: 'Wrong credentials',
          description: 'Check your login and password.',
        });
        form.reset({ login: values.login });
      }
      if (res.status === 0) {
        toast({
          title: 'It seems the server is unavailable',
          description:
            'Try again in 1 minute. If it fails again, please let me know.',
        });
      }
    });
  }

  return (
    <section className={'flex flex-col items-center gap-4'}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-fit space-y-8"
        >
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Example: Elon"
                    autoComplete={'username'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  This is your login and public display name.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type={'password'}
                    autoComplete={'current-password'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  There is no way to reset or change your password. Don&apos;t
                  lose it.
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {timer > 3 ? `[${timer}]` : <EnterIcon className="mr-2 size-4" />}{' '}
            Login
          </Button>
        </form>
      </Form>
    </section>
  );
}
