import { HttpException, Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { Prisma } from '@prisma/client';
import { PrismaService } from './../../shared/infra/prisma/prisma.service';
import { CriptUtil } from './../../shared/utils/crypt/index';
import { DecodeUtil } from './../../shared/utils/decode/index';
import { ApplicationMapper } from './application.mapper';
import { CreateApplicationModel, SuccessCreateApplication, SuccessListApplicationById } from './application.model';

@Injectable()
export class ApplicationService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly decodeUtil: DecodeUtil,
    private readonly criptUtil: CriptUtil,
    private readonly applicationMapper: ApplicationMapper
  ) { }

  public async createOneApp({ app_name }: CreateApplicationModel, accessToken: string): Promise<SuccessCreateApplication> {
    try {
      const { userId: id } = this.decodeUtil.loadUserIdAndAuthIdInBearerToken(accessToken)

      const { id: app_id, app_token } = await this.prismaService.application.create({
        data: {
          app_token: this.criptUtil.encriptText(app_name),
          app_name,
          user: { connect: { id } },
          channel: { create: {} }
        }
      })

      return {
        app_id,
        app_token
      }

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new HttpException(`Application already exists`, HttpStatus.BAD_REQUEST)
      }
      throw error
    }
  }

  public async listAppById(appId: number, accessToken: string): Promise<SuccessListApplicationById> {

    const { userId } = this.decodeUtil.loadUserIdAndAuthIdInBearerToken(accessToken)
    const application = await this.prismaService.application.findFirst({
      where: { id: appId, userId },
      include: { channel: {} }
    })

    if (application) {
      return this.applicationMapper.prismaApplicationToSuccessListApplicationById(application)
    }

    throw new HttpException(`Application not exists`, HttpStatus.NOT_FOUND)

  }
}