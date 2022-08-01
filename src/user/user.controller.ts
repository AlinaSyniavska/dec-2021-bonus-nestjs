import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';

import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto/update-user.dto";
import {AuthGuard} from "../auth/jwt-auth.guard";
import {RegisterUserDto} from "../auth/dto/register-user.dto";

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
    create(@Body() newUser: RegisterUserDto) {
        return this.userService.create(newUser);
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

