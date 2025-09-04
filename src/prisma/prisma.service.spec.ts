import { PrismaService } from './prisma.service';

describe("PrismaService", () => {
    let prismaService: PrismaService;

    beforeEach(() => {
        prismaService = new PrismaService();

        prismaService.$connect = jest.fn();
        prismaService.$disconnect = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("deve conectar ao banco ao iniciar o módulo", async () => {
        await prismaService.onModuleInit();

        expect(prismaService.$connect).toHaveBeenCalledTimes(1);
    });

    it("deve desconectar do banco ao destruir o módulo", async () => {
        await prismaService.onModuleDestroy();

        expect(prismaService.$disconnect).toHaveBeenCalledTimes(1);
    });
});