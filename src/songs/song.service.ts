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
        const songs = await this.songRepository.find({relations:["album","album.artist"]});
        return songs;
    }

    async getSongById(id: string): Promise<Song> {
        const song = await this.songRepository.getSong(id);
        if (song) {
            return song;
        }
        else {
            throw new NotFoundException("Song not found :(.")
        }
    }

    async createSong(createSongDto: CreateUpdateSongDto): Promise<Song> {
        var album = await this.albumService.getAlbumById(createSongDto.albumId);
        return await this.songRepository.createSong(createSongDto, album);
    }

    async updateSong(updateSongDto : CreateUpdateSongDto) : Promise<Song> {
        const {id, title, duration, albumId} = updateSongDto;

        let song = await this.songRepository.getSong(id);
        song.title = title;
        song.duration = duration;
        if(song.album.id != albumId){
            let newAlbum = await this.albumService.getAlbumById(albumId)
            song.album = newAlbum;
        }
        await this.songRepository.save(song);
        return song;
    }

    async deleteSong(deleteSongDto : CreateUpdateSongDto): Promise<string> {
        var album = await this.albumService.getAlbumById(deleteSongDto.albumId);
        return await this.songRepository.deleteSong(deleteSongDto.id, album);
    }
}