import { type CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { headers } from "../common/constants/network/headers";
import { methods } from "../common/constants/network/methods";
import { origins } from "../common/constants/network/origins";

export const corsConfig: CorsOptions = {
    origin: [origins.localHost(), origins.localHost(3228), origins.vercel],
    credentials: true,
    methods: [
        methods.get,
        methods.post,
        methods.put,
        methods.patch,
        methods.delete,
        methods.options,
        methods.head,
    ],
    allowedHeaders: [headers.contentType, headers.authorization],
};
