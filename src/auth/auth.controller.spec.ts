
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConflictException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;

    const mockAuthService = {
        registerUser: jest.fn(),
        login: jest.fn()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService,
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    afterEach(() => jest.clearAllMocks());

    it("Deve registrar um usuário", async () => {
        const user = {
            name: "Jefferson",
            email: "jefferson@gmail.com",
            password: "senha123",
        };
        const mockResult = {
            id: 1,
            name: "jefferson",
            email: "Jefferson@gmail.com",
            role: "USER",
        };

        mockAuthService.registerUser.mockResolvedValue(mockResult);

        const result = await controller.registerUser(user);

        expect(service.registerUser).toHaveBeenCalledWith(user);
        expect(result).toEqual(mockResult);
    });

    it("Deve lançar um erro se o email já estiver em uso", async () => {
        const user = {
            name: "Jefferson",
            email: "jefferson@gmail.com",
            password: "senha123",
        };

        mockAuthService.registerUser.mockRejectedValue(new ConflictException("Email já em uso!"));

        await expect(controller.registerUser(user)).rejects.toThrow(ConflictException);
    });

    it("Deve fazer o login de um usuário e retornar o access_token", async () => {
        const credentials: LoginDto = {
            email: "jefferson@gmail.com",
            password: "senha123",
        };

        const fakeToken = { access_token: "jwt.token.mockado" };

        mockAuthService.login.mockResolvedValue(fakeToken);

        const result = await controller.login(credentials);

        expect(service.login).toHaveBeenCalledWith(credentials);
        expect(result).toEqual(fakeToken);
    });

    it('deve lançar erro se login falhar', async () => {
        const credentials: LoginDto = {
            email: "jefferson@gmail.com",
            password: "invalido",
        };

        mockAuthService.login.mockRejectedValue(new ConflictException("Erro de login"));

        await expect(controller.login(credentials)).rejects.toThrow(ConflictException);
        expect(service.login).toHaveBeenCalledWith(credentials);
    });
});