import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Artist } from "./artist.entity";
import { ArtistRepository } from "./artist.repository";
import { AddArtistDto } from "./dto/add-artist.dto";

@Injectable()
export class ArtistService{
    constructor(
        @InjectRepository(ArtistRepository)
        private artistRepository : ArtistRepository,
    ) {}
    
    async addArtist(addArtistDto: AddArtistDto): Promise<Artist> {
        return await this.artistRepository.addArtist(addArtistDto);
    }
}