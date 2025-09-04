import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const mockUserService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
}

describe("UserController", () => {
    let controller: UserController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                { provide: UserService, useValue: mockUserService },
            ],
        }).compile()

        controller = module.get<UserController>(UserController)
    })

    it("Deve monstra todos os usuários", async () => {
        const users = [
            { name: "Jonatas", email: "jonatas@gmail.com", password: "senha123" },
            { name: "Jefferson", email: "jefferson@gmail.com", password: "senha1234" }
        ]

        mockUserService.findAll.mockResolvedValue(users)

        expect(await controller.getAll()).toEqual(users)
    })

    it("Deve mostra um usuário pelo ID", async () => {
        const user = { id: 1, name: "Jefferson", email: "jefferson@gmail.com", password: "senha123"}

        mockUserService.findOne.mockResolvedValue(user)

        expect(await controller.getById("1")).toEqual(user)
        expect(mockUserService.findOne).toHaveBeenCalledWith("1")
    })

    it("Deve atualizar um usuário", async () => {
        const newUser = { id: 1, name: "Jefferson", email: "jefferson@gmail.com", password: "senha123"}

        mockUserService.update.mockResolvedValue(newUser)

        expect(await controller.updateUser("1", {name: "Jefferson", email: "jefferson@gmail.com", password: "senha123"})).toEqual(newUser)
    })

    it("Deve remove um usuário", async () => {
        const removed = { id: 1, name: "Jefferson", email: "jefferson@gmail.com", password: "senha123"}

        mockUserService.remove.mockResolvedValue(removed)

        expect(await controller.delete('1')).toEqual(removed)
    })
})