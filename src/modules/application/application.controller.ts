import { Body, Controller, Headers, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { CreateApplicationModel } from './application.model';
import { ApplicationService } from './application.service';

@Controller()
export class ApplicationController {

  constructor(
    private readonly applicationService: ApplicationService
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('apps')
  public creagetApplication(
    @Body() body: CreateApplicationModel,
    @Headers() { authorization = '' }: Record<'authorization', string>
  ) {
    return this.applicationService.createOneApp(body, authorization)
  }

}