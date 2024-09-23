'use client';

import { useFormState } from 'react-dom';

import { submitLoginForm } from '@/actions/submit-login-form.action';
import LoginButton from '@/components/login-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm() {
  const initialState = {
    message: undefined,
  };
  const [state, formAction] = useFormState(submitLoginForm, initialState);

  return (
    <section>
      <form action={formAction}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your username below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="login">User name</Label>
              <Input
                id={'login'}
                name={'login'}
                placeholder={'Elon'}
                autoComplete={'username'}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id={'password'}
                name={'password'}
                type={'password'}
                autoComplete={'current-password'}
                required
              />
            </div>
            {state.message && (
              <div
                className="rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {state.message}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <LoginButton />
          </CardFooter>
        </Card>
      </form>
    </section>
  );
}
