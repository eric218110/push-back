import { Auth, User } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';
export class AuthUsernameAndPasswordBody {

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export type FindFirstAuth = Auth & {
  token: string
  user: User
}

export type AuthSuccess = {
  token: string,
  user: {
    id: number,
    name: string,
    email: string,
  }
}

export type AuthWithIatAndEat = {
  userId: number
  authId: number
  exp: number
  iat: number
}