import { Body, Controller, Get, Headers, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { CreateApplicationModel } from './application.model';
import { ApplicationService } from './application.service';

@Controller('apps')
export class ApplicationController {

  constructor(
    private readonly applicationService: ApplicationService
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  public creagetApplication(
    @Body() body: CreateApplicationModel,
    @Headers() { authorization = '' }: Record<'authorization', string>
  ) {
    return this.applicationService.createOneApp(body, authorization)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  public listApplicationById(
    @Param() { id = '' }: Record<'id', string>,
    @Headers() { authorization = '' }: Record<'authorization', string>
  ) {
    return this.applicationService.listAppById(Number(id), authorization)
  }
}