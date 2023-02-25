import { Prisma } from "@prisma/client";
import { CreateNewUserBody } from "./user.model";

export class MapperCreateNewUserBodyInUserCreateInput {
  public to(body: CreateNewUserBody): Prisma.UserCreateInput {
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
}