import { ConflictException } from "@nestjs/common";
import { exception } from "node:console";
import { EntityRepository, Repository } from "typeorm";
import { ArtistNationality } from "./artist-nationality.enum";
import { Artist } from "./artist.entity";
import { AddArtistDto } from "./dto/add-artist.dto";
import { UpdateArtistPhotoDto } from "./dto/update-artist.dto";

@EntityRepository(Artist)
export class ArtistRepository extends Repository<Artist> {

    async getArtist(name: string) : Promise<Artist> {
        return await this.findOne({name : name});
    }

    async addArtist(addArtistDto : AddArtistDto) : Promise<Artist> {
        const {name, nationality, photo, genre} = addArtistDto;
        
        let artist = new Artist();
        artist.name = name;      
        artist.nationality = nationality
        artist.photo = photo,
        artist.genre = genre
    
        const artistInDbb =  this.getArtist(name);
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

    async deleteArtist(name: string) : Promise<string> {
        const artist = await this.getArtist(name);
        await this.delete(artist);
        return `${name} has been deleted from the database.`
    }
}