import { Body, Controller, Post } from '@nestjs/common';
import { Get, Param, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { CreateNewUserBody, FindOneByIdPath } from './user.model';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('users/register')
  createUser(@Body() body: CreateNewUserBody) {
    return this.userService.registerOneUser(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('users/:id')
  readUserById(@Param() { id }: FindOneByIdPath) {
    return this.userService.readUserById(Number(id));
  }
}
