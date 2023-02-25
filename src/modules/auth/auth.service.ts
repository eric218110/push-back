import { PrismaService } from './../../shared/infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService) { }

  getHello(): string {
    return 'Hello World!';
  }
}
