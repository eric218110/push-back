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