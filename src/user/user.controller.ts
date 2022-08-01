import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';

import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {AuthGuard} from "../auth/jwt-auth.guard";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(AuthGuard)
    getAll() {
        return this.userService.getAll();
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    // getById(@Param() params: any) {
    //     const {id} = params;
    getById(@Param('id') id: string) {
        return this.userService.getById(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    create(@Body() user: CreateUserDto) {
        return this.userService.create(user);
    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
    update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
        return this.userService.update(id, updateUser);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}

