import { CriptUtil } from './../../shared/utils/crypt/index';
import { Injectable } from '@nestjs/common';
import { Auth, Company, Prisma, User } from "@prisma/client";
import { CreateNewUserBody, FindOneUser, ListOneUserById } from "./user.model";

@Injectable()
export class UserMapper {

  constructor(
    private readonly criptUtil: CriptUtil
  ) { }

  public async createNewUserBodyToUserCreateInput(body: CreateNewUserBody): Promise<Prisma.UserCreateInput> {
    const { company_name, company_address } = body

    const data = company_name && company_address ? { company: { create: { company_address, company_name } } } : {}
    const { name, phone_number = '', email, password } = body

    const passwordHash = await this.criptUtil.generateHashByValue(password)

    return {
      name,
      phone_number,
      auth: {
        create: {
          email,
          password: passwordHash
        }
      },
      company: {
        ...data.company
      }
    }
  }

  public findUserToListOneUserById(findOneUser: FindOneUser): ListOneUserById {
    const {
      name, id, phone_number,
      auth: { email, password },
      company
    } = findOneUser

    const companyData = company ? { company_address: company?.company_name, company_name: company?.company_name } : undefined

    return {
      name,
      id,
      phone_number,
      email,
      password,
      ...companyData
    }
  }
}
