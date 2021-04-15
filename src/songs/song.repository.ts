import { EntityRepository, Repository } from "typeorm";
import { Song } from "./song.entity";

@EntityRepository(Song)
export class SongRepository extends Repository<Song> {

}