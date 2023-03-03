import { Module } from '@nestjs/common';
import { PrismaModule } from './../../shared/infra/prisma/prisma.module';
import { WebPushSettingsController } from './webpush-settings.controller';
import { WebPushSettingsMapper } from './webpush-settings.mapper';
import { WebPushSettingsService } from './webpush-settings.service';

@Module({
  imports: [PrismaModule],
  controllers: [WebPushSettingsController],
  providers: [WebPushSettingsService, WebPushSettingsMapper],
})
export class WebPushSettingsModule { }
