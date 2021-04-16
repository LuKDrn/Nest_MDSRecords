import { IsNotEmpty } from "class-validator";

export class SignInUserDto {
    username : string;
    @IsNotEmpty()
    email : string;
    @IsNotEmpty()
    password : string;
}