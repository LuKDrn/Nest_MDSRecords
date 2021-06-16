import { ConflictException } from "@nestjs/common";
import { Album } from "src/albums/album.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateUpdateSongDto } from "./dto/createUpdate-song.dto";
import { Song } from "./song.entity";

@EntityRepository(Song)
export class SongRepository extends Repository<Song> {
    async getSong(id: string) : Promise<Song> {        
        const song = await this.createQueryBuilder('song').where({id : id}).innerJoinAndSelect("song.album", "album").leftJoinAndSelect("album.artist", "artist").getOne()
        if (song) {
            return song;
        }
        return null;
    }

    async createSong(createSongDto : CreateUpdateSongDto, album : Album) : Promise<Song> {

        const song = this.create({...createSongDto, album});
        (await album).songs = [song];
        const copy = await this.getSong(song.id);
        if(!copy){
            return await this.save(song);
        } else {
            throw new ConflictException("This song already exist.")
        }
    }

    async deleteSong(id: string, album : Album) : Promise<string> {
        const song = await this.getSong(id);
        var index = await album.songs.indexOf(song);
        album.songs.splice(index, 1);
        await this.delete(song);
        return `${song.title} has been deleted from the database.`
    }
}