import { EntityRepository, Repository } from "typeorm";
import { ArtistNationality } from "./artist-nationality.enum";
import { Artist } from "./artist.entity";
import { AddArtistDto } from "./dto/add-artist.dto";

@EntityRepository(Artist)
export class ArtistRepository extends Repository<Artist> {

    async addArtist(addArtistDto : AddArtistDto) : Promise<Artist> {
        const {name, nationality, photo, genre} = addArtistDto;
        
        let artist = new Artist();
        artist.name = name;      
        artist.nationality = nationality
        artist.photo = photo,
        artist.genre = genre

        
        let artistInDbb = this.findOne(artist);
        if(!artistInDbb){
            return await this.save(artist);
        }
        else {
            throw new Error("This artist is already saved in database.")
        }
    }
}