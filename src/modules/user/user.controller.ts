import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateNewUserBody } from './user.model';
import { Param } from '@nestjs/common/decorators';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('users/register')
  createUser(@Body() body: CreateNewUserBody) {
    return this.userService.registerOneUser(body);
  }

  @Post('users/{id}')
  readUser(@Param() id: number) {
    return this.userService.readUserById(id);
  }
}
