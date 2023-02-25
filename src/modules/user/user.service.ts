import { ErrorHandler } from './../../shared/error/error.handler';
import { CreateNewUserBody, FindOneUser, ListOneUserById } from './user.model';
import { PrismaService } from './../../shared/infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserMapper } from './user.mapper';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService,
    private userMapper: UserMapper
  ) { }

  public async registerOneUser(body: CreateNewUserBody): Promise<{ id: number } | ErrorHandler> {
    try {
      const data = { ...this.userMapper.createNewUserBodyToUserCreateInput(body) }
      const { id } = await this.prisma.user.create({ data })
      return { id }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new HttpException(`email ${body.email} already exists`, HttpStatus.FORBIDDEN)
      }
      throw new HttpException('Not possible create user', HttpStatus.SERVICE_UNAVAILABLE)
    }
  }

  public async readUserById(id: number): Promise<ListOneUserById | ErrorHandler> {
    const findOneUser = await this.prisma.user.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        phone_number: true,
        auth: { select: { password: true, email: true } },
        company: { select: { company_address: true, company_name: true } }
      }
    })

    if (!findOneUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return this.userMapper.findUserToListOneUserById(findOneUser as FindOneUser)

  }
}
