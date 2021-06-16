import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUpdateAlbumDto } from "src/albums/dto/createUpdate-album.dto";
import { Artist } from "./artist.entity";
import { ArtistRepository } from "./artist.repository";
import { AddArtistDto } from "./dto/add-artist.dto";
import { UpdateArtistPhotoDto } from "./dto/update-artist.dto";

@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(ArtistRepository)
        private artistRepository: ArtistRepository,
    ) { }

    async getArtists(): Promise<Artist[]> {
        const artists = await this.artistRepository.createQueryBuilder("artist").leftJoinAndSelect("artist.albums", "albums").innerJoinAndSelect("albums.songs", "songs").getMany();
        return artists;
    }

    async getArtistByName(name: string): Promise<Artist> {
        const artist = await this.artistRepository.getArtist(name);
        if (artist) {
            return artist;
        }
        else {
            throw new NotFoundException("Artist not found :(.")
        }
    }

    async addArtist(addArtistDto: AddArtistDto): Promise<Artist> {
        return await this.artistRepository.addArtist(addArtistDto);
    }

    async updateArtistPhoto(updateArtistPhotoDto : UpdateArtistPhotoDto) : Promise<Artist> {
        return this.artistRepository.updateArtistPhoto(updateArtistPhotoDto);
    }
    async deleteArtist(name: string): Promise<string> {
        const artist = await this.artistRepository.getArtist(name);
        await this.artistRepository.remove(artist);
        return `${name} has been deleted from the database.`
    }
}