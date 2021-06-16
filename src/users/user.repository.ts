import { ConflictException, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { SignInUserDto } from "./dto/signin-user.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async getUser(email: string) : Promise<User> {
        const user = await this.createQueryBuilder("user").where({email : email}).getOne();
        if (user) {
            return user;
        }
        return null;
    }

    async signIn(signInUserDto : SignInUserDto) : Promise<User> {
        const { email, password } = signInUserDto;
        const user = await this.getUser(email);
        const isValid = await bcrypt.compare(password, user.password);
        if (!user && isValid) {
            return user;
        }
        else {
            throw new UnauthorizedException("Email ou mot de passe incorrecte.");
        }
    }

    async register(createUserDto : CreateUserDto) : Promise<User> {
        const {username, email, password, photo, albums} = createUserDto;

        const salt = await bcrypt.genSalt();
        let user = new User();
        user.username = username;
        user.password = await bcrypt.hash(password, salt);
        user.email = email;
        user.photo = photo;
        user.albums = albums;
        
    
        const userInBdd =  await this.getUser(email);
        if(!userInBdd){
            await user.save();
            return user;
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