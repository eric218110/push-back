import { Auth, Company, Prisma, User } from "@prisma/client";
import { CreateNewUserBody, FindOneUser, ListOneUserById } from "./user.model";

export class UserMapper {
  public createNewUserBodyToUserCreateInput(body: CreateNewUserBody): Prisma.UserCreateInput {
    const { company_name, company_address } = body

    const data = company_name && company_address ? { company: { create: { company_address, company_name } } } : {}
    const { name, phone_number = '', email, password } = body

    return {
      name,
      phone_number,
      auth: {
        create: {
          email,
          password
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
