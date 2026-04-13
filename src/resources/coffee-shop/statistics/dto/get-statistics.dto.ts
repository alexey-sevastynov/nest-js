import { IsDateString, IsNotEmpty } from "class-validator";

export class GetStatisticsDto {
    @IsNotEmpty()
    @IsDateString()
    from!: string;

    @IsNotEmpty()
    @IsDateString()
    to!: string;
}
