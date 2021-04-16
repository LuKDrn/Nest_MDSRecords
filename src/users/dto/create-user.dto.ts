import { IsNotEmpty, IsUrl } from "class-validator";
import { Unique } from "typeorm";

export class CreateUserDto {
    @IsNotEmpty()
    @Unique(['username'])
    username: string;
    @IsNotEmpty()
    @Unique(['email'])
    email: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    firstName: string;
    @IsNotEmpty()
    lastName: string;
    @IsUrl()
    photo: string;
}