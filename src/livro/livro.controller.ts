import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { LivroService } from './livro.service';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('livro')
export class LivroController {
    constructor(private readonly livrosService: LivroService) { }

    @Post()
    @ApiOperation({ summary: 'criar um livro' })
    @ApiResponse({ status: 201, description: "livro criado com sucesso!!" })
    @ApiResponse({ status: 400, description: "Dados invalidos" })
    async registration(@Body() data: CreateBookDto) {
        return this.livrosService.create(data)
    }

    @Get()
    @ApiOperation({ summary: 'Mostrar todos os livros' })
    @ApiResponse({ status: 201, description: "livros encontrado com sucesso!!" })
    @ApiResponse({ status: 400, description: "Dados inválidos" })
    async getAll() {
        return this.livrosService.findAll()
    }

    @Get('id=:id')
    @ApiOperation({ summary: 'Mostrar os livros pelo ID' })
    @ApiResponse({ status: 201, description: "çlivros encontrado com sucesso!!" })
    @ApiResponse({ status: 400, description: "Dados inválidos" })
    @ApiParam({ name: 'id', type: String, description: 'Id do livro', example: "4f4e7edf-2c82-4a43-ab47-d49ed9d0cb0a" })
    async getById(@Param('id') id: string) {
        return this.livrosService.findOne(id)
    }
    @Put('id=:id')
    @ApiOperation({ summary: 'Atualizar livros pelo Id' })
    @ApiResponse({ status: 201, description: "livro encontrado com sucesso!!" })
    @ApiResponse({ status: 400, description: "Dados inválidos" })
    @ApiParam({ name: 'id', type: String, description: 'Id do livro', example: "4f4e7edf-2c82-4a43-ab47-d49ed9d0cb0a" })
    async updateProduct(@Param('id') id: string, @Body() data: UpdateBookDto) {
        return this.livrosService.update(id, data)
    }

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