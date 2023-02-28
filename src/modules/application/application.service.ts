import { HttpException, Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { Prisma } from '@prisma/client';
import { PrismaService } from './../../shared/infra/prisma/prisma.service';
import { CriptUtil } from './../../shared/utils/crypt/index';
import { DecodeUtil } from './../../shared/utils/decode/index';
import { CreateApplicationModel, SuccessCreateApplication } from './application.model';

@Injectable()
export class ApplicationService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly decodeUtil: DecodeUtil,
    private readonly criptUtil: CriptUtil
  ) { }

  public async createOneApp(createApplicationModel: CreateApplicationModel, acessToken: string): Promise<SuccessCreateApplication> {
    try {
      const { userId } = this.decodeUtil.loadUserIdAndAuthIdInBearerToken(acessToken)

      const createApplication = await this.prismaService.application.create({
        data: {
          app_name: createApplicationModel.app_name,
          user: {
            connect: {
              id: userId
            }
          }
        }
      })

      const app_token = this.criptUtil.encriptText(createApplication.app_name)

      return {
        app_id: createApplication.id,
        app_token
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new HttpException(`Application already exists`, HttpStatus.BAD_REQUEST)
      }
      throw error
    }
  }
}