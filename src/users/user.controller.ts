import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { SignInUserDto } from "./dto/signin-user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers();
    }

    @Get(':email')
    async getUser(@Param() email : string): Promise<User> {
        return await this.userService.getUser(email);
    }

    @Post('signIn')
    async signIn(@Body() signInUserDto: SignInUserDto): Promise<User> {
        return await this.userService.signIn(signInUserDto);
    }

    @Post('register')
    @UsePipes(ValidationPipe)
    async register(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.register(createUserDto);
    }

    @Delete(':email')
    async deleteUser(@Param() email : string): Promise<string> {
        return this.userService.deleteUser(email);
    }
}