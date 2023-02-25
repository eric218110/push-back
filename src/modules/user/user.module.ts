import { PrismaModule } from './../../shared/infra/prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { UserMapper } from './user.mapper';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserMapper]
})
export class UserModule { }
