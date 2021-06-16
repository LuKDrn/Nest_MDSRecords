import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ArtistService } from "src/artists/artist.service";
import { Album } from "./album.entity";
import { AlbumRepository } from "./album.repository";
import { CreateUpdateAlbumDto } from "./dto/createUpdate-album.dto";

@Injectable()
export class AlbumService{
    constructor(
        @InjectRepository(AlbumRepository)
        private albumRepository : AlbumRepository,
        private artistService: ArtistService,
    ) {}

    async getAlbums(): Promise<Album[]> {
        const albums = await this.albumRepository.createQueryBuilder('albums').innerJoinAndSelect("albums.artist", 'artist').leftJoinAndSelect("albums.songs", "songs").getMany();
        return albums;
    }

    async getAlbumByTitle(title: string): Promise<Album> {
        const album = await this.albumRepository.getAlbum(title);
        if (album) {
            return album;
        }
        else {
            throw new NotFoundException("Album not found :(.")
        }
    }

    async createAlbum(createAlbumDto: CreateUpdateAlbumDto): Promise<Album> {
        var artist = await this.artistService.getArtistByName(createAlbumDto.artistName);
        return await this.albumRepository.createAlbum(createAlbumDto, artist);
    }

    async updateAlbum(updateAlbumDto : CreateUpdateAlbumDto) : Promise<Album> {
        const {id,title, year, cover, artistName} = updateAlbumDto;

        let album = await this.albumRepository.createQueryBuilder('album').where({id : id}).leftJoinAndSelect("album.artist", 'artist').leftJoinAndSelect("album.songs", "songs").getOne()
        album.title = title;
        album.year = year;
        album.cover = cover;
        if(album.artist.name != artistName){
            let newArtist = await this.artistService.getArtistByName(artistName);
            album.artist = newArtist;
        }
        await this.albumRepository.save(album);
        return album;
    }

    async deleteAlbum(deleteAlbumDto : CreateUpdateAlbumDto): Promise<string> {
        var artist = await this.artistService.getArtistByName(deleteAlbumDto.artistName);
        return await this.albumRepository.deleteAlbum(deleteAlbumDto.title, artist);
    }
    
}