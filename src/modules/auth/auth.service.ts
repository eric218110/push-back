import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../../shared/infra/prisma/prisma.service';
import { CriptUtil } from './../../shared/utils/crypt/index';
import { AuthMapper } from './auth.mapper';
import { AuthUsernameAndPasswordBody, FindFirstAuth } from './auth.model';

@Injectable()
export class AuthService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly authMapper: AuthMapper,
    private readonly criptUtil: CriptUtil,
    private readonly jwtService: JwtService
  ) { }

  public async validateUserCredentials(credentials: AuthUsernameAndPasswordBody) {
    const { login: email, password } = credentials

    const user = await this.findOneUserByEmail(email)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const passwordIsMath = await this.criptUtil.compareValueAndHash(password, user.password || '')

    if (!passwordIsMath) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    return user
  }

  public async loginByEmailAndPassword(body: AuthUsernameAndPasswordBody) {
    const findFirst = await this.validateUserCredentials(body)

    const payload = {
      userId: findFirst.id,
      authId: findFirst.user.id
    }

    const token = this.jwtService.sign(payload)

    const data = { ...findFirst, token }

    return this.authMapper.findFirstToAuthSuccess(data as FindFirstAuth)

  }

  private async findOneUserByEmail(email: string): Promise<FindFirstAuth> {
    return this.prisma.auth.findFirst({
      where: {
        email
      },
      select: {
        id: true,
        email: true,
        password: true,
        user: {
          select: { name: true, id: true }
        }
      }
    }) as unknown as FindFirstAuth
  }
}
