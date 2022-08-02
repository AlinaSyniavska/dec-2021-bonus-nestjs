import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';

import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto/update-user.dto";
import {AuthGuard} from "../auth/jwt-auth.guard";
import {RegisterUserDto} from "../auth/dto/register-user.dto";
import {ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiParam, ApiTags} from "@nestjs/swagger";
import {CustomOkResponse} from "../core/swagger/swagger.helper";
import {
    SWAGGER_EXAMPLE_GET_ALL_USERS,
    SWAGGER_EXAMPLE_REGISTER_USER
} from "../core/swagger/example/swagger-example-user.list";

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    @CustomOkResponse({exampleData: SWAGGER_EXAMPLE_GET_ALL_USERS})
    @ApiBadRequestResponse({description: 'Bad Request'})
    @ApiNotFoundResponse({description: 'Not Found'})
    @UseGuards(AuthGuard)
    getAll() {
        return this.userService.getAll();
    }

    @Get('/:id')
    // @ApiQuery({name: 'id', type: 'string'})
    @ApiParam({name: 'id', type: 'string'})
    @CustomOkResponse({exampleData: SWAGGER_EXAMPLE_REGISTER_USER})
    @ApiNotFoundResponse({description: 'Not Found'})
    @UseGuards(AuthGuard)
    getById(@Param('id') id: string) {
        return this.userService.getById(id);
    }

    @Post()
    @ApiBody({type: RegisterUserDto})
    @CustomOkResponse({status: 201, exampleData: SWAGGER_EXAMPLE_REGISTER_USER})
/*    @ApiOkResponse({
        status: 201,
        schema: {
            example: {
                id: '62e8f9f9e378d290eb642c6c',
                name: "Nick",
                age: 39,
                email: "nick@gmail.com",
                password: "$2a$07$xGwImr4LuMJCCvzIcrXlJuFlnb1Bl.Bpj7mtFlTgbeFzpP7wh8sgm",
                workStatus: false,
                createAt: "2022-08-02T10:18:33.000Z",
                updateAt: "2022-08-02T10:18:33.000Z"
            }
        }
    })*/
    @UseGuards(AuthGuard)
    create(@Body() newUser: RegisterUserDto) {
        return this.userService.create(newUser);
    }

    @Patch('/:id')
    @ApiParam({name: 'id', type: 'string'})
    @ApiBody({type: UpdateUserDto})
    @CustomOkResponse({exampleData: SWAGGER_EXAMPLE_REGISTER_USER})
    @ApiNotFoundResponse({description: 'Not Found'})
    @UseGuards(AuthGuard)
    update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
        return this.userService.update(id, updateUser);
    }

    @Delete('/:id')
    @ApiParam({name: 'id', type: 'string'})
    @CustomOkResponse({exampleData: SWAGGER_EXAMPLE_REGISTER_USER})
    @ApiNotFoundResponse({description: 'Not Found'})
    @UseGuards(AuthGuard)
    delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}

