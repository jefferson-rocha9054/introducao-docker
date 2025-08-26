import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LivroModule } from './livro/livro.module';

@Module({
  imports: [PrismaModule, LivroModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
