import { Injectable } from '@nestjs/common';
import { Prisma, SettingWebPush } from '@prisma/client';
import { CreateWebPushSettingsModel, ListWebPushSettings } from './webpush-settings.model';

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

  public settingWebPushToListWebPushSettings(webPushSettings: SettingWebPush): ListWebPushSettings {

    const {
      name = '',
      address = '',
      url_icon = '',
      allow_button_text = '',
      deny_button_text = '',
      message_text_allow_notification = '',
      message_text = '',
      enable_url_redirect = 0,
      message_title = '',
      url_redirect = ''
    } = webPushSettings = webPushSettings || {} as SettingWebPush

    return {
      settings: {
        site: {
          name,
          address,
          url_icon
        },
        allow_notification: {
          allow_button_text,
          deny_button_text,
          message_text: message_text_allow_notification
        },
        welcome_notification: {
          enable_url_redirect,
          message_text,
          message_title,
          url_redirect
        }
      }
    }
  }

}