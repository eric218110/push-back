import { Injectable } from '@nestjs/common';
import { Application, ChannelsApplication } from '@prisma/client';
import { SuccessListApplicationById } from './application.model';

type Props = Application & {
  channel: ChannelsApplication;
}

@Injectable()
export class ApplicationMapper {
  public prismaApplicationToSuccessListApplicationById(application: Props): SuccessListApplicationById {
    const { app_name, id: app_id, app_token, channel: { applicationId, id, ...rest } } = application

    return {
      app_id,
      app_name,
      app_token,
      active_channels: {
        ...rest
      }
    }
  }
}