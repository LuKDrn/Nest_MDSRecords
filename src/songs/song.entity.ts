import { Album } from "src/albums/album.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Song extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string; 
    @Column()
    title : string;
    @Column()
    duration: number;
    @ManyToOne(() => Album, album => album.songs, {onDelete: 'CASCADE'})
    album : Album;
}