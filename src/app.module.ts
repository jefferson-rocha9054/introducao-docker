import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LivroModule } from './livro/livro.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, LivroModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
