import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import {PrismaService} from "../core/prisma.service";
import {JwtService} from "@nestjs/jwt";
import {AuthService} from "../auth/auth.service";

@Module({
  providers: [UserService, PrismaService, JwtService, AuthService],
  controllers: [UserController]
})
export class UserModule {}
