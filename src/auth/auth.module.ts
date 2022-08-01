import { Module } from '@nestjs/common';
import {JwtModule, JwtService} from "@nestjs/jwt";

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserService} from "../user/user.service";
import {PrismaService} from "../core/prisma.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, UserService, PrismaService],
  imports: [
      JwtModule.register({
        secret: process.env.SECRET_WORD_JWT || 'secretWord',
        signOptions: {
          expiresIn: '24h'
        }
      })
  ],
})
export class AuthModule {}
