import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';

import {LoginUserDto} from "./dto/login-user.dto";
import {UserService} from "../user/user.service";
import {User} from "@prisma/client";
import {RegisterUserDto} from "./dto/register-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) {}

    async login(user: LoginUserDto) {
        const validUser = await this.validateUser(user);

        const {accessToken} = await this.generateToken(validUser);

        return {
            user: validUser,
            accessToken
        };
    }

    async register(user: RegisterUserDto) {
        const userByEmail = await this.userService.getByEmail(user.email);

        if(userByEmail) {
            throw new HttpException('User is already exist', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(user.password, 7);
        return await this.userService.create({
            ...user,
            password: hashPassword,
        });
    }

    private async validateUser(user: LoginUserDto) {
        const userFromDB = await this.userService.getByEmail(user.email);

        console.log(userFromDB.password);
        console.log(user.password);

        const isPassEqual = await bcrypt.compare(user.password, userFromDB.password);

        if(userFromDB && isPassEqual) {
            return userFromDB;
        }

        throw new UnauthorizedException({message: 'Wrong email or password'});
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, name: user.name};
        const accessToken = this.jwtService.sign(payload, {
            privateKey: process.env.SECRET_WORD_JWT,
        });

        return {
            accessToken,
        };
    }
}
