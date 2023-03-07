import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  // eslint-disable-next-line prettier/prettier
  ValidateNested
} from 'class-validator';
class Site {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  url_icon: string;
}

class AllowNOtification {
  @IsString()
  @IsNotEmpty()
  message_text: string;

  @IsString()
  @IsNotEmpty()
  allow_button_text: string;

  @IsString()
  @IsNotEmpty()
  deny_button_text: string;
}

class WelcomeNotification {
  @IsString()
  @IsNotEmpty()
  message_title: string;

  @IsString()
  @IsNotEmpty()
  message_text: string;

  @IsNumber()
  enable_url_redirect: number;

  @IsString()
  @IsNotEmpty()
  url_redirect: string;
}

export class CreateWebPushSettingsModel {
  @IsObject()
  @ValidateNested()
  @Type(() => Site)
  site: Site;

  @IsObject()
  @ValidateNested()
  @Type(() => AllowNOtification)
  allow_notification: AllowNOtification;

  @IsObject()
  @ValidateNested()
  @Type(() => WelcomeNotification)
  welcome_notification: WelcomeNotification;
}

export type ListWebPushSettings = {
  settings: {
    site: {
      name: string,
      address: string,
      url_icon: string
    },
    allow_notification: {
      message_text: string,
      allow_button_text: string,
      deny_button_text: string
    },
    welcome_notification: {
      message_title: string,
      message_text: string,
      enable_url_redirect: number,
      url_redirect: string
    }
  }
}
