type TApiError = {
  message: string;
  statusCode: number;
};

export type TApiResponse<T> = {
  status: number;
  data: T | TApiError | null;
};
