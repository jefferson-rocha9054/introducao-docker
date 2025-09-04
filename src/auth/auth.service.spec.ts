
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;
    let prisma: PrismaService;
    let jwtService: JwtService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: PrismaService,
                    useValue: {
                        user: {
                            findUnique: jest.fn(),
                            create: jest.fn(),
                        },
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue('fake-jwt-token'),
                        verify: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        prisma = module.get<PrismaService>(PrismaService);
        jwtService = module.get<JwtService>(JwtService)
    });

    afterEach(() => jest.clearAllMocks());

    it("deve criar um novo usuário com sucesso", async () => {
        const user = {
            name: "Jefferson",
            email: "jefferson@gmail.com",
            password: "senha123",
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        (prisma.user.create as jest.Mock).mockResolvedValue({
            id: 1,
            name: user.name,
            email: user.email,
            role: 'USER',
        });

        const result = await service.registerUser(user);

        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: { email: user.email },
        });
        expect(prisma.user.create).toHaveBeenCalled();
        expect(result).toEqual({
            id: 1,
            name: user.name,
            email: user.email,
            role: 'USER',
        });
    });

    it("deve lançar erro se o email já existir", async () => {
        const user = {
            name: "Jefferson",
            email: "jefferson@gmail.com",
            password: "senha123",
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue({
            id: 1,
            email: user.email,
        });

        await expect(service.registerUser(user)).rejects.toThrow(ConflictException);
        expect(prisma.user.create).not.toHaveBeenCalled();
    });

    it("deve fazer hash da senha com bcrypt", async () => {
        const user = {
            name: "Jefferson",
            email: "jefferson@gmail.com",
            password: "senha123",
        };

        const hashSpy = jest.spyOn(bcrypt, "hash");
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        (prisma.user.create as jest.Mock).mockResolvedValue({
            id: 1,
            name: user.name,
            email: user.email,
            role: 'USER',
        });

        await service.registerUser(user);

        expect(hashSpy).toHaveBeenCalledWith(user.password, 10);
    });

    it("deve retornar o usuário se as credenciais estiverem corretas", async () => {
        const mockUser = {
            id: 1,
            email: "jefferson@gmail.com",
            password: await bcrypt.hash("senha123", 10),
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

        const result = await service.validateUser("jefferson@gmail.com", 'senha123');

        expect(result).toEqual(mockUser);
    });

    it("deve lançar erro se o usuário não for encontrado", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(service.validateUser("jefferson@gmail.com", 'senha123'),).rejects.toThrow(UnauthorizedException);
    })

    it("deve lançar erro se o usuário não tiver senha", async () => {
        const mockUser = {
            id: 1,
            email: "jefferson@gmail.com",
            password: null,
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

        await expect(service.validateUser("jefferson@gmail.com", "qualquer"),).rejects.toThrow(UnauthorizedException);
    });

    it("deve lançar erro se a senha estiver incorreta", async () => {
        const mockUser = {
            id: 1,
            email: "jefferson@gmail.com",
            password: await bcrypt.hash("senha_correta", 10),
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

        await expect(service.validateUser("jefferson@gmail.com", "senha_errada"),).rejects.toThrow(UnauthorizedException);
    });

    it('deve fazer login e retornar o token JWT', async () => {
        const mockUser = {
            id: 1,
            email: "jefferson@gmail.com",
            role: "USER",
        };
        
        jest.spyOn(service, "validateUser").mockResolvedValue(mockUser as any);

        const credentials = {
            email: "jefferson@gmail.com",
            password: "senha123",
        };

        const result = await service.login(credentials);

        expect(service.validateUser).toHaveBeenCalledWith(
            credentials.email,
            credentials.password,
        );

        expect(jwtService.sign).toHaveBeenCalledWith({
            userId: mockUser.id,
            email: mockUser.email,
            role: mockUser.role,
        });

        expect(result).toEqual({ access_token: "fake-jwt-token" });
    });
})