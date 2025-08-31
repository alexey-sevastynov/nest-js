import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user-dto";
import { UpdateUserDto } from "./dto/update-user-dto";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll() {
        return this.userService.findAllUser();
    }

    @Get(":id")
    findById(@Param("id") id: string) {
        return this.userService.findByIdUser(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() user: CreateUserDto) {
        console.log(user);
        return this.userService.createUser(user);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() user: UpdateUserDto) {
        return this.userService.updateUser(id, user);
    }

    @Patch(":id")
    partialUpdate(@Param("id") id: string, @Body() user: Partial<UpdateUserDto>) {
        return this.userService.partialUpdateUser(id, user);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.userService.deleteUser(id);
    }

    @Delete()
    deleteAll() {
        return this.userService.deleteAllUsers();
    }
}
