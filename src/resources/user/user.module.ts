import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user-schema";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { Address, AddressSchema } from "../../resources/address/address-schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Address.name, schema: AddressSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
