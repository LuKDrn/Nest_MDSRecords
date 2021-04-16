import { ConflictException, HttpException, HttpStatus } from "@nestjs/common";
import { threadId } from "node:worker_threads";
import { EntityRepository, Repository } from "typeorm";
import { Artist } from "./artist.entity";
import { AddArtistDto } from "./dto/add-artist.dto";
import { UpdateArtistPhotoDto } from "./dto/update-artist.dto";

@EntityRepository(Artist)
export class ArtistRepository extends Repository<Artist> {

    async getArtist(name: string) : Promise<Artist> {
        const artist = await this.createQueryBuilder("artist").leftJoinAndSelect("artist.albums", "album").where({ name : name}).getOne();
        if (artist) {
            return artist;
        }
        throw new HttpException('Artist does not exist', HttpStatus.NOT_FOUND);
    }

    async addArtist(addArtistDto : AddArtistDto) : Promise<Artist> {
        const {name, nationality, photo, genre} = addArtistDto;
        
        let artist = new Artist();
        artist.name = name;      
        artist.nationality = nationality
        artist.photo = photo,
        artist.genre = genre
    
        const artistInDbb = await this.findOne({name : name});
        if(!artistInDbb){
            return await this.save(artist);
        }
        else {
            throw new ConflictException("This artist is already saved in database.")
        }
    }

    async updateArtistPhoto(updateArtistPhotoDto: UpdateArtistPhotoDto): Promise<Artist> {
        const {photo} = updateArtistPhotoDto;

        let artist = await this.getArtist(updateArtistPhotoDto.name);
        artist.photo = photo;
        return await this.save(artist);
    }
}