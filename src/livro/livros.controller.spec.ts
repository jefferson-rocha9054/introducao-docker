import { Test, TestingModule } from "@nestjs/testing";
import { LivroService } from "./livro.service";
import { LivroController } from "./livro.controller";

const mockBookService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
}

describe("BookController", () => {
    let controller: LivroController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LivroController],
            providers: [
                { provide: LivroService, useValue: mockBookService },
            ],
        }).compile()

        controller = module.get<LivroController>(LivroController)
    })

    it("Deve criar um novo livro", async () => {
        const book = { nome: "moby dick", autor: "joao", lamcamento: 1883 }

        mockBookService.create.mockResolvedValue(book)

        expect(await controller.registration(book as any)).toEqual(book)
        expect(mockBookService.create).toHaveBeenCalledWith(book)
    })

    it("Deve mostra todos os livro", async () => {
        const book = { nome: "moby dick", autor: "raimundo", descricao: "Achocolatado" }

        mockBookService.findAll.mockResolvedValue(book)

        expect(await controller.getAll()).toEqual(book)
    })

    it("Deve mostra um produto pelo ID", async () => {
        const book = { id: 1, nome: "moby dick", autor: "luan", lancamento: "2050" }

        mockBookService.findOne.mockResolvedValue(book)

        expect(await controller.getById("1")).toEqual(book)
        expect(mockBookService.findOne).toHaveBeenCalledWith("1")
    })

    it("Deve atualizar um livro", async () => {
        const newBook = { id: 1, nome: "mobydick", autor: "tufao", lancamento: 2025 }

        mockBookService.update.mockResolvedValue(newBook)

        expect(await controller.updateProduct("1", { nome: "mobydick", autor: "tufao", lancamento: 2025 })).toEqual(newBook)
    })

it("Deve remove um livro", async () => {
        const removed = {id: 1, nome: "moby dick", autor: "joao", lamcamento: 2026 }

        mockBookService.remove.mockResolvedValue(removed)

        expect(await controller.delete('1')).toEqual(removed)
    })


})

