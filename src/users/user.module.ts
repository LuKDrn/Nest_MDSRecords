import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtStrategy } from "./jwt.strategy";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
    imports: [
        PassportModule.register(JwtStrategy),
        JwtModule.register({
            secret: 'topSecret51',
            signOptions: {
                expiresIn: 3600,
            },
        }),
        TypeOrmModule.forFeature([UserRepository])],
    controllers: [UserController],
    providers: [UserService, JwtStrategy],
    exports: [JwtStrategy, PassportModule]
})
export class UserModule {}