import { MapperCreateNewUserBodyInUserCreateInput } from './user.mapper';
import { PrismaModule } from './../../shared/infra/prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, MapperCreateNewUserBodyInUserCreateInput],
})
export class UserModule { }
