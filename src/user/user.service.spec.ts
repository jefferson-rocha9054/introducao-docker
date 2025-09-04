import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { PrismaService } from "../prisma/prisma.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";

const mockPrisma = {
    user: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}

describe("UserService", () => {
    let service: UserService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: PrismaService, useValue: mockPrisma },
            ],
        }).compile()

        service = module.get<UserService>(UserService)
    })

    it("Deve mostra todos os usuários", async () => {
        const users = [
            { name: "Jefferson", email: "jefferson@gmail.com", password: "senha123" },
            { name: "Bianca", email: "bianca@gmail.com", password: "senha1234" }
        ]

        mockPrisma.user.findMany.mockResolvedValue(users)

        expect(await service.findAll()).toEqual(users)
    })

    it("Deve mostra um usuário pelo ID", async () => {
        const user = { id: 1, name: "Jefferson", email: "jefferson@gmail.com", password: "senha123" }

        mockPrisma.user.findUnique.mockResolvedValue(user)

        expect(await service.findOne("1")).toEqual(user)
    })

    it("Deve lançar erro se o usuário não for encontrado", async () => {
        mockPrisma.user.findUnique.mockResolvedValue(null);

        await expect(service.findOne("1")).rejects.toThrow(NotFoundException);
    });

    it("Deve atualizar um usuário", async () => {
        const existingUser = {
            id: 1,
            name: "Jefferson",
            email: "jefferson@gmail.com",
            password: "senha123"
        };

        mockPrisma.user.findUnique.mockResolvedValue(existingUser);
        mockPrisma.user.update.mockResolvedValue(existingUser);

        const result = await service.update("1", {
            name: "Jefferson",
            email: "jefferson@gmail.com",
            password: "senha123"
        });

        expect(result).toEqual(existingUser);
    });

    it("Deve lançar erro ao tentar atualizar um usuário inexistente", async () => {
        mockPrisma.user.findUnique.mockResolvedValue(null);

        await expect(service.update("1", {
            name: "Jonatas",
            email: "jonatas@email.com",
            password: "senha345"
        })).rejects.toThrow(BadRequestException);
    });

    it("Deve deletar um usuáriio", async () => {
        const existingUser = {
            id: 1,
            name: "Jefferson",
            email: "jefferson@gmail.com",
            password: "senha123"
        };

        mockPrisma.user.findUnique.mockResolvedValue(existingUser);
        mockPrisma.user.delete.mockResolvedValue({ id: '1' });

        const result = await service.remove('1');

        expect(result).toEqual({ id: '1' });
        expect(mockPrisma.user.delete).toHaveBeenCalledWith({
            where: { id: '1' }
        });
    })

    it("Deve lançar erro ao tentar deletar um usuário inexistente", async () => {
        mockPrisma.user.findUnique.mockResolvedValue(null);

        await expect(service.remove("1")).rejects.toThrow(BadRequestException);
    });
})