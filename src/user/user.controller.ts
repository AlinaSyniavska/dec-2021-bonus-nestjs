import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';

import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getAll() {
        return this.userService.getAll();
    }

    @Get('/:id')
    // getById(@Param() params: any) {
    //     const {id} = params;
    getById(@Param('id') id: string) {
        return this.userService.getById(id);
    }

    @Post()
    create(@Body() user: CreateUserDto) {
        return this.userService.create(user);
    }

    @Patch('/:id')
    update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
        return this.userService.update(id, updateUser);
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}

