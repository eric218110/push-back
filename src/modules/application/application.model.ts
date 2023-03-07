import { IsNotEmpty, IsString } from "class-validator";

export class CreateApplicationModel {
  @IsString()
  @IsNotEmpty()
  app_name: string
}

export type SuccessCreateApplication = {
  app_id: number,
  app_token: string
}

export type SuccessListApplicationById = SuccessCreateApplication & {
  app_name: string,
  active_channels: {
    webpush: boolean,
    email: boolean,
    sms: boolean,
  }
}

export class ListApplicationPaginagionModel {
  @IsString()
  @IsNotEmpty()
  skip: string

  @IsString()
  @IsNotEmpty()
  take: string
}

type ListApplicationPaginagionSuccessType = {
  app_name: string;
  channel: {
    webpush: boolean;
    email: boolean;
    sms: boolean;
  };
}

export type ListApplicationPaginagionSuccess = {
  count: number
  items: ListApplicationPaginagionSuccessType[]
}