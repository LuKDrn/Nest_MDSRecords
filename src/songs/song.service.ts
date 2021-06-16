import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { throws } from "node:assert";
import { Album } from "src/albums/album.entity";
import { AlbumService } from "src/albums/album.service";
import { CreateUpdateSongDto } from "./dto/createUpdate-song.dto";
import { Song } from "./song.entity";
import { SongRepository } from "./song.repository";

@Injectable()
export class SongService{
    constructor(
        @InjectRepository(SongRepository)
        private songRepository : SongRepository,
        private albumService : AlbumService,
    ) {}
    
    async getSongs(): Promise<Song[]> {
        const songs = await this.songRepository.createQueryBuilder('songs').innerJoinAndSelect("songs.album", "album").leftJoinAndSelect("album.artist", "artist").getMany();
        return songs;
    }

    async getSongByTitle(title: string): Promise<Song> {
        const song = await this.songRepository.getSong(title);
        if (song) {
            return song;
        }
        else {
            throw new NotFoundException("Song not found :(.")
        }
    }

    async createSong(createSongDto: CreateUpdateSongDto): Promise<Song> {
        var album = await this.albumService.getAlbumByTitle(createSongDto.albumTitle);
        return await this.songRepository.createSong(createSongDto, album);
    }

    async updateSong(updateSongDto : CreateUpdateSongDto) : Promise<Song> {
        const {id, title, duration, albumTitle} = updateSongDto;

        let song = await this.songRepository.createQueryBuilder('song').where({id : id}).innerJoinAndSelect("song.album", "album").leftJoinAndSelect("album.artist", "artist").getOne()
        song.title = title;
        song.duration = duration;
        if(song.album.title != albumTitle){
            let newAlbum = await this.albumService.getAlbumByTitle(albumTitle)
            song.album = newAlbum;
        }
        await this.songRepository.save(song);
        return song;
    }

    async deleteSong(deleteSongDto : CreateUpdateSongDto): Promise<string> {
        var album = await this.albumService.getAlbumByTitle(deleteSongDto.albumTitle);
        return await this.songRepository.deleteSong(deleteSongDto.title, album);
    }
}