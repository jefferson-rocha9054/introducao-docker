
import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany()
    }

    async findOne(id: string): Promise<User | null> {
        const foundUser = await this.prisma.user.findUnique(
            { where: { id } }
        )

        if (!foundUser) {
            throw new NotFoundException(`Usuário com o ID ${id} não encontrado!`)
        }

        return foundUser
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new BadRequestException('Usuário não encontrado');
        }
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                ...data,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                role: true,
            },
        });

        return updatedUser;
    }

    async remove(id: string) {
        const user = await this.prisma.user.findUnique(
            { where: { id } }
        )

        if (!user) {
            throw new BadRequestException("Usuário não encontrado")
        }

        return this.prisma.user.delete(
            { where: { id } }
        )
    }
}