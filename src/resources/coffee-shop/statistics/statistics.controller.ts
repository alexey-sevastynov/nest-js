import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { StatisticsService } from "./statistics.service";
import { GetStatisticsDto } from "./dto/get-statistics.dto";
import { Roles } from "../../../common/auth/decorators/roles.decorator";
import { authorizedRoles } from "../../../common/auth/constants/authorized-roles";

@Roles(...authorizedRoles.coffeeShop)
@ApiTags("Statistics")
@Controller("coffee-shop/statistics")
export class StatisticsController {
    constructor(private readonly statisticsService: StatisticsService) {}

    @Get()
    @ApiOperation({ summary: "Get aggregated statistics for a specific period" })
    @ApiResponse({ status: 200, description: "Returns aggregated statistics." })
    getStatistics(@Query() query: GetStatisticsDto) {
        return this.statisticsService.getStatistics(query);
    }
}
