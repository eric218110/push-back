import { PrismaModule } from './../infra/prisma/prisma.module';
import { PrismaService } from './../infra/prisma/prisma.service';
import { UserModule } from './../../modules/user/user.module';
import { AuthModule } from './../../modules/auth/auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, UserModule],
})
export class AppModule { }
