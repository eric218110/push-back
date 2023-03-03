import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../filter/http/http-exception.filter';
import { ApplicationModule } from './../../modules/application/application.module';
import { AuthModule } from './../../modules/auth/auth.module';
import { UserModule } from './../../modules/user/user.module';
import { WebPushSettingsModule } from './../../modules/webpush-settings/webpush-settings.module';
import { UtilsModule } from './../utils/module/utils.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    UtilsModule,
    ApplicationModule,
    WebPushSettingsModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule { }
