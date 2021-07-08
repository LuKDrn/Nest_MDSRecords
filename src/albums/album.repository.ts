import { ConflictException, HttpException, HttpStatus } from "@nestjs/common";
import { Artist } from "src/artists/artist.entity";
import { EntityRepository, Repository } from "typeorm";
import { Album } from "./album.entity";
import { CreateUpdateAlbumDto } from "./dto/createUpdate-album.dto";

@EntityRepository(Album)
export class AlbumRepository extends Repository<Album> {
    
    async getAlbum(id: string) : Promise<Album> {        
        const album = await this.findOne(id,{relations:["artist","songs"]});
        if (album) {
            return album;
        }
        return null;
    }

    async createAlbum(createAlbumDto : CreateUpdateAlbumDto, artist : Artist) : Promise<Album> {
        const album = this.create({...createAlbumDto, artist});
        (await artist).albums = [album];
        const copy = await this.getAlbum(album.id);
        if(!copy){
            return await this.save(album);
        } else {
            throw new ConflictException("This album already exist.")
        }
    }


    async deleteAlbum(id: string, artist : Artist) : Promise<string> {
        const album = await this.getAlbum(id);
        var index = await artist.albums.indexOf(album);
        artist.albums.splice(index, 1);
        await this.delete(album);
        return `${album.title} has been deleted from the database.`
    }
}