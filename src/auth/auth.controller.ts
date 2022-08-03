import {Body, Controller, HttpCode, Post} from '@nestjs/common';

import {AuthService} from "./auth.service";
import {LoginUserDto} from "./dto/login-user.dto";
import {RegisterUserDto} from "./dto/register-user.dto";
import {ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiTags} from "@nestjs/swagger";
import {CustomOkResponse} from "../core/swagger/swagger.helper";
import {
    SWAGGER_EXAMPLE_LOGIN_USER,
    SWAGGER_EXAMPLE_REGISTER_USER
} from "../core/swagger/example/swagger-example-user.list";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('/login')
    @ApiBody({type: LoginUserDto})
    @CustomOkResponse({exampleData: SWAGGER_EXAMPLE_LOGIN_USER})
    @ApiBadRequestResponse({description: 'Bad Request'})
    @ApiNotFoundResponse({description: 'Not Found'})
    @HttpCode(200)
    login(@Body() loginUser: LoginUserDto) {
        return this.authService.login(loginUser);
    }

    @Post('/registration')
    @ApiBody({type: RegisterUserDto})
    @CustomOkResponse({status: 201, exampleData: SWAGGER_EXAMPLE_REGISTER_USER, description: 'User was registered'})
    @ApiBadRequestResponse({description: 'Bad Request'})
    @ApiNotFoundResponse({description: 'Not Found'})
    register(@Body() registerUser: RegisterUserDto) {
        return this.authService.register(registerUser);
    }
}
