import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateWebPushSettingsModel } from './webpush-settings.model';
import { WebPushSettingsService } from './webpush-settings.service';

@Controller('apps/:appId/webpushes/settings')
export class WebPushSettingsController {
  constructor(
    private readonly webPushSettingsService: WebPushSettingsService,
  ) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  addWebPush(
    @Body() body: CreateWebPushSettingsModel,
    @Param() { appId = '' }: Record<'appId', string>,
  ) {
    return this.webPushSettingsService.addWebPushSettingsInApplication(
      body,
      Number(appId),
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  loadWebPushSettings(
    @Param() { appId = '' }: Record<'appId', string>,
  ) {
    return this.webPushSettingsService.listWebPushSettings(
      Number(appId),
    );
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  updateStatusWebPushSettings(
    @Param() { appId = '' }: Record<'appId', string>,
  ) {
    return this.webPushSettingsService.updateStatusWebPushSettings(
      Number(appId),
    );
  }
}
