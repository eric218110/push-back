import { UserModule } from './../../modules/user/user.module';
import { AuthModule } from './../../modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../filter/http/http-exception.filter';

@Module({
  imports: [AuthModule, UserModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule { }
