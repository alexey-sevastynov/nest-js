import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { AddressService } from "./address.service";
import { CreateAddressDto } from "./dto/create-address-dto";

@Controller("addresses")
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Get()
    async findAll() {
        return this.addressService.findAllAddress();
    }

    @Get(":id")
    async findById(@Param("id") id: string) {
        return this.addressService.findByIdAddress(id);
    }

    @Post()
    async create(@Body() address: CreateAddressDto) {
        return this.addressService.createAddress(address);
    }

    @Delete(":id")
    async delete(@Param("id") id: string) {
        return this.addressService.deleteAddress(id);
    }

    @Delete()
    async deleteAll() {
        return this.addressService.deleteAllAddresses();
    }
}
