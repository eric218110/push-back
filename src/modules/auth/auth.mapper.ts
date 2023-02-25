import { AuthSuccess, FindFirstAuth } from "./auth.model";

export class AuthMapper {
  public findFirstToAuthSuccess(findFirst: FindFirstAuth): AuthSuccess {
    const { token, email, user } = findFirst

    return {
      token,
      user: {
        email,
        ...user
      }
    }
  }
}