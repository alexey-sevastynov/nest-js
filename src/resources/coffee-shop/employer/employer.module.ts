import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmployerService } from "./employer.service";
import { Employer, EmployerSchema } from "./employer-schema";
import { EmployerController } from "./employer.controller";

@Module({
    imports: [MongooseModule.forFeature([{ name: Employer.name, schema: EmployerSchema }])],
    controllers: [EmployerController],
    providers: [EmployerService],
    exports: [EmployerService],
})
export class EmployerModule {}
