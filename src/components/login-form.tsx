'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { LoginFormSchema, loginFormSchema } from '@/schemas';
import { submitLoginForm } from '@/actions';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginFormSchema) {
    const res = await submitLoginForm(values);
    console.log(res);
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
          'Try again in 1 minute. If it fails again, notify the developer.',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}
