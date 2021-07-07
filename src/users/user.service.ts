import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { SignInUserDto } from "./dto/signin-user.dto";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository,
    ) {}

    async getUsers() : Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUser(email : string) : Promise<User> {
        const user = await this.userRepository.getUser(email);
        if(user){
            return user;
        }
        else {
            throw new NotFoundException("User not found.");
        }
    }

    async signIn(signInUserDto : SignInUserDto) : Promise<User> {
        const user = await this.userRepository.signIn(signInUserDto);
        return user;
    }

    async register(createUserDto : CreateUserDto) : Promise<User> {
        return await this.userRepository.register(createUserDto);
    }

    async deleteUser(id : string) : Promise<string> {
        return await this.userRepository.deleteUser(id);
    }
}