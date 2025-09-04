import { Body, Controller, Post, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { LivroService } from './livro.service';
import { ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AdminGuard } from '../auth/admin.guard';
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('livro')
export class LivroController {
    constructor(private readonly livrosService: LivroService) { }

    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @Post()
    @ApiOperation({ summary: 'criar um livro' })
    @ApiResponse({ status: 201, description: "livro criado com sucesso!!" })
    @ApiResponse({ status: 400, description: "Dados invalidos" })
    async registration(@Body() data: CreateBookDto) {
        return this.livrosService.create(data)
    }

    @ApiBearerAuth()
    @Get()
    @ApiOperation({ summary: 'Mostrar todos os livros' })
    @ApiResponse({ status: 201, description: "livros encontrado com sucesso!!" })
    @ApiResponse({ status: 400, description: "Dados inválidos" })
    async getAll() {
        return this.livrosService.findAll()
    }

    @ApiBearerAuth()
    @Get('id=:id')
    @ApiOperation({ summary: 'Mostrar os livros pelo ID' })
    @ApiResponse({ status: 201, description: "livros encontrado com sucesso!!" })
    @ApiResponse({ status: 400, description: "Dados inválidos" })
    @ApiParam({ name: 'id', type: String, description: 'Id do livro', example: "4f4e7edf-2c82-4a43-ab47-d49ed9d0cb0a" })
    async getById(@Param('id') id: string) {
        return this.livrosService.findOne(id)
    }

    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @Put('id=:id')
    @ApiOperation({ summary: 'Atualizar livros pelo Id' })
    @ApiResponse({ status: 201, description: "livro encontrado com sucesso!!" })
    @ApiResponse({ status: 400, description: "Dados inválidos" })
    @ApiParam({ name: 'id', type: String, description: 'Id do livro', example: "4f4e7edf-2c82-4a43-ab47-d49ed9d0cb0a" })
    async updateProduct(@Param('id') id: string, @Body() data: UpdateBookDto) {
        return this.livrosService.update(id, data)
    }

    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @Delete('id=:id')
    @ApiOperation({ summary: 'Deletar livro pelo ID' })
    @ApiResponse({ status: 201, description: "livro encontrado com sucesso!!" })
    @ApiResponse({ status: 400, description: "Dados inválidos" })
    @ApiParam({ name: 'id', type: String, description: 'Id do livro', example: "4f4e7edf-2c82-4a43-ab47-d49ed9d0cb0a" })
    async delete(@Param('id') id: string) {
        return this.livrosService.remove
        (id)
    }




}