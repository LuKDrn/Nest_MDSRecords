import { Body, Controller, Delete, Get, NotAcceptableException, Param, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "./dto/create-user.dto";
import { SignInUserDto } from "./dto/signin-user.dto";
import { JwtPayload } from "./jwt.payload";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    @Get()
    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers();
    }

    @Get('get')
    async getUser(@Param() email : string): Promise<User> {
        return await this.userService.getUser(email);
    }

    @Post('signIn')
    async signIn(@Body() signInUserDto: SignInUserDto) {
        const userCheck = await this.userService.signIn(signInUserDto);
        if(userCheck){
            const {username, email} = userCheck;
            const payload: JwtPayload = {username, email}
            console.log("Payload = ", payload);
            const accessToken = await this.jwtService.sign(payload);
            return {accessToken};
        }
        else {
            throw new NotAcceptableException("Problem occured in signin");
        }
    }

    @Post('register')
    @UsePipes(ValidationPipe)
    async register(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.register(createUserDto);
    }

    @Delete('deleteAccount')
    async deleteUser(@Param('id') id : string): Promise<string> {
        return this.userService.deleteUser(id);
    }
}