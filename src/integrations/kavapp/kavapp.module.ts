import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { KavappClient } from "./clients/kavapp.client";

@Module({
    imports: [
        HttpModule.register({
            timeout: 10_000,
        }),
    ],
    providers: [KavappClient],
    exports: [KavappClient],
})
export class KavappModule {}
