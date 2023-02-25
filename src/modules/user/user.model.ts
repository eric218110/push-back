import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateNewUserBody {

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  company_name: string;

  @IsOptional()
  phone_number: string;

  @IsOptional()
  company_address: string;
}