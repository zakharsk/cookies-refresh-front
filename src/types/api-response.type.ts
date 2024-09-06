import { TCookie } from '@/types/cookie.type';

type TApiError = {
  message: string;
  statusCode: number;
};

export type TApiResponse<T> = {
  status: number;
  cookies: TCookie[];
  data: T | TApiError | null;
};
