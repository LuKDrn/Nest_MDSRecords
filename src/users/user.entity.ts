import { Album } from "src/albums/album.entity";
import { BaseEntity, BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string; 

    @Column({
        type: 'varchar', 
        nullable: false 
    })
    @Unique(['username'])
    username : string;

    @Column({
        type: 'varchar', 
        nullable: false 
    })
    email: string;

    @Column({
        type: 'varchar', 
        nullable: false 
    })
    password : string;

    @Column()
    photo: string;

    @ManyToMany(() => Album)
    @JoinTable()
    albums : Album[]
}