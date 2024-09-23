export type TApiRequest = {
  path: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  version?: string;
  bearerToken?: string;
  includeAccessToken?: boolean;
  includeRefreshToken?: boolean;
};
