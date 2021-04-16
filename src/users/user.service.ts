import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { SignInUserDto } from "./dto/signin-user.dto";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository,
    ) {}

    async checkConnection(signInUserDto : SignInUserDto) : Promise<SignInUserDto>{
        return;
    } 
    async getUsers() : Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUser(email : string) : Promise<User> {
        return await this.userRepository.getUser(email);
    }

    async signIn(signInUserDto : SignInUserDto) : Promise<User> {
        return await this.userRepository.signIn(signInUserDto);
    }

    async register(createUserDto : CreateUserDto) : Promise<User> {
        return await this.userRepository.register(createUserDto);
    }

    async deleteUser(email : string) : Promise<string> {
        return await this.userRepository.deleteUser(email);
    }
}