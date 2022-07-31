import {Injectable} from '@nestjs/common';
import {Prisma, User } from '@prisma/client';

import {PrismaService} from "../core/prisma.service";

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    async getAll(): Promise<User[]> {
        return this.prismaService.user.findMany();
    }

    async getById(userId: string): Promise<User> {
        return this.prismaService.user.findUnique({
            where: {id: userId}
        });
    }

    // create(user: CreateUserDto) {}
    // update(userId: string, updateUser: UpdateUserDto) {}
    // delete(userId: string) {}

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prismaService.user.create({
            data,
        });
    }

    async update(userId: string, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prismaService.user.update({
            where: {id: userId},
            data: {
                name: data.name,
                age: data.age,
                workStatus: data.workStatus,
            },
        });
    }

    async delete(userId: string): Promise<User> {
        return this.prismaService.user.delete({
            where: {id: userId},
        });
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        return this.prismaService.user.update({
            data,
            where,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prismaService.user.delete({
            where,
        });
    }
}

