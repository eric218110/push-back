import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../filter/http/http-exception.filter';
import { AuthModule } from './../../modules/auth/auth.module';
import { UserModule } from './../../modules/user/user.module';
import { UtilsModule } from './../utils/module/utils.module';

@Module({
  imports: [AuthModule, UserModule, UtilsModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule { }
