import { Artist } from "src/artists/artist.entity";
import { Song } from "src/songs/song.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Album extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string; 
    @Column()
    title: string;
    @Column()
    year : number;
    @Column()
    cover : string;
    @OneToMany(() => Song, song => song.album)
    songs : Song[]
    @ManyToOne(() => Artist, artist => artist.albums)
    artist: Artist;
}