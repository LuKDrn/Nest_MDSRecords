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

    async getAlbumById(id: string): Promise<Album> {
        const album = await this.albumRepository.getAlbum(id);
        if (album) {
            return album;
        }
        else {
            throw new NotFoundException("Album not found :(.")
        }
    }

    async createAlbum(createAlbumDto: CreateUpdateAlbumDto): Promise<Album> {
        var artist = await this.artistService.getArtistById(createAlbumDto.artistId);
        return await this.albumRepository.createAlbum(createAlbumDto, artist);
    }

    async updateAlbum(updateAlbumDto : CreateUpdateAlbumDto) : Promise<Album> {
        const {id,title, year, cover, artistId} = updateAlbumDto;

        let album = await this.getAlbumById(id);
        album.title = title;
        album.year = year;
        album.cover = cover;
        if(album.artist.id != artistId){
            let newArtist = await this.artistService.getArtistById(artistId);
            album.artist = newArtist;
        }
        await this.albumRepository.save(album);
        return album;
    }

    async deleteAlbum(deleteAlbumDto: CreateUpdateAlbumDto): Promise<string> {
        const { id, artistId } = deleteAlbumDto;
        var artist = await this.artistService.getArtistById(artistId);
        return await this.albumRepository.deleteAlbum(id, artist);
    }
    
}