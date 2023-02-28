import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import jwtDecode from 'jwt-decode';

@Injectable()
export class DecodeUtil {
  public loadUserIdAndAuthIdInBearerToken(bearerToken: string) {
    const bearer = 'Bearer '
    if (!bearerToken.includes(bearer)) throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)

    const [_, tokenWithoutBearer] = bearerToken.split('Bearer ')
    const token = jwtDecode<{ authId: number, userId: number }>(tokenWithoutBearer)

    if (token?.authId && token?.userId) {
      return {
        authId: token.authId,
        userId: token.userId
      }
    }

    if (!token) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
  }
}