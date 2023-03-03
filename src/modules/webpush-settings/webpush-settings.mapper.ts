import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateWebPushSettingsModel } from './webpush-settings.model';

@Injectable()
export class WebPushSettingsMapper {
  public createWebPushSettingsModelToSettingWebPushCreateInput(createWebPushSettingsModel: CreateWebPushSettingsModel, appId: number): Prisma.SettingWebPushCreateInput {
    const {
      allow_notification: {
        message_text: message_text_allow_notification,
        ...restAllowNotification
      },
      site,
      welcome_notification: {
        enable_url_redirect,
        ...rest
      }
    } = createWebPushSettingsModel

    return {
      message_text_allow_notification,
      ...restAllowNotification,
      ...site,
      ...rest,
      enable_url_redirect: Number(enable_url_redirect),
      application: {
        connect: {
          id: appId
        }
      }
    }
  }
}