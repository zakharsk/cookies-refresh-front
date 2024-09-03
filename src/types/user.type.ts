export interface TUser {
  id: string;
  login: string;
}

export type TCurrentUser = TUser & {
  passwordHash: string;
  refreshTokenHash: string;
  createdAt: string;
  updatedAt: string;
};
