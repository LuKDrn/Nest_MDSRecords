import { ConflictException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { SignInUserDto } from "./dto/signin-user.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async getUser(email: string) : Promise<User> {
        return await this.findOne({email : email});
    }

    async signIn(signInUserDto : SignInUserDto) : Promise<User> {
        return
    }

    async register(createUserDto : CreateUserDto) : Promise<User> {
        const {username, email, password, firstName, lastName, photo} = createUserDto;
        
        let user = new User();
        user.username = username;
        user.email = email;
        user.password = password;
        user.firstName = firstName;
        user.lastName = lastName;
        user.photo = photo;
        
    
        const userInBdd =  this.getUser(email);
        if(!userInBdd){
            return await this.save(user);
        }
        else {
            throw new ConflictException("A user with this email already exist.")
        }
    }

    async deleteUser(email : string) : Promise<string> {
        const user = await this.getUser(email);
        await this.delete(user);
        return `The user ${email} has been deleted.`
    }
}