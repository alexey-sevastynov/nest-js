import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./infra/database/database.module";
import { TaskModule } from "./modules/task/task.module";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, TaskModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
