import { Module } from '@nestjs/common';
import { PrismaModule } from './../../shared/infra/prisma/prisma.module';
import { UtilsModule } from './../../shared/utils/module/utils.module';
import { UserController } from './user.controller';
import { UserMapper } from './user.mapper';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule, UtilsModule],
  controllers: [UserController],
  providers: [UserService, UserMapper],
  exports: [UserService]
})
export class UserModule { }
