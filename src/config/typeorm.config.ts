import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeormConfig: TypeOrmModuleOptions = {​
    type: 'postgres',​
    host: 'localhost',​
    port: 5432,​
    username: 'postgres',​
    password: '2Edc9890dff',​
    database: 'mdsRecords',​
    autoLoadEntities: true,​
    synchronize: true,​
   };