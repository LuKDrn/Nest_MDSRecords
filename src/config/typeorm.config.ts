import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeormConfig: TypeOrmModuleOptions = {​
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: +process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PWD || '2Edc9890dff',
    database: process.env.DATABASE_NAME || 'mdsRecords',
    autoLoadEntities: true,
    synchronize: true,
   };