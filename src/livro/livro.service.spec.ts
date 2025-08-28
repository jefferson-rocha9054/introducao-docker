import { Test, TestingModule } from "@nestjs/testing";
import { LivroService } from "./livro.service";
import { PrismaService } from "../prisma/prisma.service";
import { NotFoundException } from "@nestjs/common";

const mockPrisma = {
    livros: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}

describe("LivroService", () => {
    let service: LivroService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LivroService,
                { provide: PrismaService, useValue: mockPrisma },
            ],
        }).compile()

        service = module.get<LivroService>(LivroService)
    })

    it("deve criar um livro", async () => {
        const book = { nome: "moby dick", autor: "joao", lancamento: 1897 }

        mockPrisma.livros.create.mockResolvedValue(book)

        const result = await service.create(book as any)

        expect(result).toEqual(book)
        expect(mockPrisma.livros.create).toHaveBeenCalledWith({ data: book })
    })

    it("deve listar todos os livros", async () => {
        const boock = [
            { nome: "moby dick", autor: "joao", lamcamento: 1897 },
            { nome: "fuja", autor: "pedro", lamcamento: 2000 },
        ]

        mockPrisma.livros.findMany.mockResolvedValue(boock)

        expect(await service.findAll()).toEqual(boock)
    })

    it("Deve monstra um livro pelo ID", async () => {
        const boock = { id: 1, nome: "moby dick", autor: "joao", lamcamento: "1897" }

        mockPrisma.livros.findUnique.mockResolvedValue(boock)

        expect(await service.findOne("1")).toEqual(boock)
    })

    it("Deve mostrar erro se não encontra o livro", async () => {
        mockPrisma.livros.findUnique.mockResolvedValue(null)

        await expect(service.findOne('999')).rejects.toThrow(NotFoundException)
    })

    it("Deve atualizar um livro", async () => {
        const newBook = { id: 1, nome: "moby dick", autor: "joao", lancamento: 1897 };

        mockPrisma.livros.findUnique.mockResolvedValue(newBook);
        mockPrisma.livros.update.mockResolvedValue(newBook);

        const result = await service.update("1", {
            nome: "moby dick",
            autor: "joao",
            lancamento: 1897
        });

        expect(result).toEqual(newBook);
    });

    it('Deve lançar erro ao atualizar livro inexistente', async () => {
        mockPrisma.livros.update.mockRejectedValue(new Error('Not found'));

        await expect(service.update('999', { nome: 'Teste' })).rejects.toThrow();
    })

    it("Deve deletar um livro", async () => {
        const removed = { id: '1' }

        mockPrisma.livros.delete.mockResolvedValue(removed)

        const result = await service.remove('1');

        expect(result).toEqual(removed);
        expect(mockPrisma.livros.delete).toHaveBeenCalledWith({
            where: { id: '1' }
        });
    })

    it('Deve lançar erro ao deletar livro inexistente', async () => {
        mockPrisma.livros.delete.mockRejectedValue(new Error('Not found'));

        await expect(service.remove('999')).rejects.toThrow();
    });

})