import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from './../user/user.service';
import { AuthWithIatAndEat } from './auth.model';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UserService,
  ) {
    const { JWT_SECRET_KEY = 'secret' } = process.env
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  async validate({ iat, exp, userId }: AuthWithIatAndEat, next: Function) {
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.readUserById(userId);

    if (!user) throw new UnauthorizedException();

    next(null, user);
  }
}
