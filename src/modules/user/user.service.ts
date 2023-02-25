import { ErrorHandler } from './../../shared/error/error.handler';
import { CreateNewUserBody } from './user.model';
import { PrismaService } from './../../shared/infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { MapperCreateNewUserBodyInUserCreateInput } from './user.mapper';

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService,
    private mapper: MapperCreateNewUserBodyInUserCreateInput
  ) { }

  public async registerOneUser(body: CreateNewUserBody): Promise<{ id: number } | ErrorHandler> {
    try {
      const data = { ...this.mapper.to(body) }
      const { id } = await this.prisma.user.create({ data })
      return { id }
    } catch (error) {
      console.error(error)
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        return { error: `email ${body.email} already exists` }
      }
      return { error: 'Not possible create user' }
    }
  }

  public readUserById(id: number) {
    try {
      const user = this.prisma.user.findFirst({
        where: {
          id
        }
      })
    } catch (error) {
      
    }
  }
}
