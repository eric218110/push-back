import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './../../shared/infra/prisma/prisma.service';
import { WebPushSettingsMapper } from './webpush-settings.mapper';
import { CreateWebPushSettingsModel } from './webpush-settings.model';

@Injectable()
export class WebPushSettingsService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly webPushSettingsMapper: WebPushSettingsMapper
  ) { }

  public async addWebPushSettingsInApplication(
    body: CreateWebPushSettingsModel,
    appId: number,
  ): Promise<void> {

    const applicationSettingsWebPush = await this.prismaService.application.findFirst({
      where: {
        id: appId
      },
      select: {
        web_push_settings: {
          select: {
            name: true
          }
        }
      }
    })

    const data = this.webPushSettingsMapper.createWebPushSettingsModelToSettingWebPushCreateInput(body, appId)

    if (applicationSettingsWebPush?.web_push_settings === null) {
      const { id } = await this.prismaService.settingWebPush.create({ data })
      if (!id) throw new HttpException('Not possibles add config in application', HttpStatus.BAD_REQUEST)
    }

    const { id } = await this.prismaService.settingWebPush.update({ data, where: { applicationId: appId } })
    if (!id) throw new HttpException('Not possibles add config in application', HttpStatus.BAD_REQUEST)

  }

  public async listWebPushSettings(appId: number) {
    const webPushSettings = await this.prismaService.settingWebPush.findUnique({
      where: {
        applicationId: appId
      }
    }).catch(() => { throw new HttpException('Not possible read settings', HttpStatus.BAD_REQUEST) })

    return this.webPushSettingsMapper.settingWebPushToListWebPushSettings(webPushSettings)
  }

  public async updateStatusWebPushSettings(appId: number) {

  }
}
