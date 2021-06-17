import { ConflictException, HttpException, HttpStatus } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Artist } from "./artist.entity";
import { AddArtistDto } from "./dto/add-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";

@EntityRepository(Artist)
export class ArtistRepository extends Repository<Artist> {

    async getArtist(id: string) : Promise<Artist> {
        const artist = await this.createQueryBuilder("artist").where({ id : id}).leftJoinAndSelect("artist.albums", "albums").innerJoinAndSelect("albums.songs", "songs").getOne();
        if (artist) {
            return artist;
        }
        throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
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

    async updateArtist(updateArtistDto: UpdateArtistDto): Promise<Artist> {
        const {id, name, photo, genre, nationality} = updateArtistDto;

        let artist = await this.getArtist(id);
        artist.name = name != undefined ? name : artist.name;
        artist.photo = photo != undefined ? photo : artist.photo;
        artist.genre = genre != undefined ? genre : artist.genre;
        artist.nationality = nationality != undefined ? nationality : artist.nationality;

        return await this.save(artist);
    }
}