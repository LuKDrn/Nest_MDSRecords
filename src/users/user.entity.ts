import { Album } from "src/albums/album.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string; 
    @Column()
    @Unique(['username'])
    username : string;
    @Column()
    email: string;
    @Column()
    password : string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    photo: string;
    @ManyToMany(() => Album)
    @JoinTable()
    albums : Album[]
}