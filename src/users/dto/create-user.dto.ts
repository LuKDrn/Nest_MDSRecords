import { IsNotEmpty, IsUrl } from "class-validator";
import { Album } from "src/albums/album.entity";
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
    @IsUrl()
    photo: string;
    
    albums: Album[];
}