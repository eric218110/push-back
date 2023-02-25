import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { UserModule } from '../user/user.module';
import { PrismaModule } from './../../shared/infra/prisma/prisma.module';
import { UtilsModule } from './../../shared/utils/module/utils.module';
import { AuthController } from './auth.controller';
import { AuthMapper } from './auth.mapper';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [
    PrismaModule,
    UtilsModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: {
          expiresIn: Number(process.env.JWT_EXPIRATION_TIME)
        }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthMapper, AuthStrategy]
})
export class AuthModule { }
