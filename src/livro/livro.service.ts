import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Livros } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LivroService {

 constructor( private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.livros.findMany();
    }

    async findOne(id: string): Promise<Livros | null> {
        const foundBook = await this.prisma.livros.findUnique(
            {where:{id}}
        )

        if (!foundBook) {
            throw new NotFoundException(
                `livros com o id ${id} não encontrado!`
            )
        }

        return foundBook
    }

    async create(data: {
        nome: string,
        autor: string,
        lancamento: number
    }) {
        return this.prisma.livros.create({data})
    }

    async update(id: string, data: Partial<Livros>): Promise<Livros> {
        const book = await this.prisma.livros.findUnique(
            {where:{id}}
        )

        if (!book) throw new BadRequestException("Livro não encontrado!")

        return this.prisma.livros.update({
            where:{id}, data
        })
    }

    async remove(id: string) {
        const product = await this.prisma.livros.findUnique({
            where: { id },
        });

        if (!product) throw new BadRequestException('livro não Encontrado!');

        return await this.prisma.livros.delete({
            where: { id },
        });
    }
    }