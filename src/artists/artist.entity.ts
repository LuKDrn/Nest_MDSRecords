import { Album } from "src/albums/album.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ArtistGenre } from "./artist-genre.enum";
import { ArtistNationality } from "./artist-nationality.enum";

@Entity()
export class Artist extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string; 
    @Column()
    name : string;
    @Column()
    nationality : ArtistNationality;
    @Column()
    photo: string;
    @Column()
    genre: ArtistGenre;

    @OneToMany(() => Album, album => album.artist)
    albums: Album[];

}