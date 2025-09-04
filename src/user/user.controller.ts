
import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AdminGuard } from '../auth/admin.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
        constructor(private readonly userService: UserService) {}

        @ApiBearerAuth()
        @UseGuards(AdminGuard)
        @Get()
        @ApiOperation({summary: "Mostrar todos os usuários"})
        @ApiResponse({ status: 201, description: "Usuário encontrado com sucesso!!" })
        @ApiResponse({ status: 400, description: "Dados inválidos" })
        async getAll() {
            return this.userService.findAll()
        }

        @ApiBearerAuth()
        @UseGuards(AdminGuard)
        @Get('id=:id')
        @ApiOperation({summary: "Mostrar os usuários pelo ID"})
        @ApiResponse({ status: 201, description: "Usuário encontrado com sucesso!!" })
        @ApiResponse({ status: 400, description: "Dados inválidos" })
        @ApiParam({ name: 'id', type: String, description: "Id do usuário", example: "4f4e7edf-2c82-4a43-ab47-d49ed9d0cb0a" })
        async getById(@Param('id') id: string) {
            return this.userService.findOne(id)
        }
    
        @ApiBearerAuth()
        @UseGuards(AdminGuard)
        @Put('id=:id')
        @ApiOperation({summary: "Atualizar usuário pelo Id"})
        @ApiResponse({ status: 201, description: "Usuário encontrado com sucesso!!" })
        @ApiResponse({ status: 400, description: "Dados inválidos" })
        @ApiParam({ name: 'id', type: String, description: "Id do usuário", example: "4f4e7edf-2c82-4a43-ab47-d49ed9d0cb0a" })
        async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
            return this.userService.update(id, data)
        }
    
        @ApiBearerAuth()
        @UseGuards(AdminGuard)
        @Delete('id=:id')
        @ApiOperation({summary: "Deletar usuários pelo ID"})
        @ApiResponse({ status: 201, description: "Usuário encontrado com sucesso!!" })
        @ApiResponse({ status: 400, description: "Dados inválidos" })
        @ApiParam({ name: 'id', type: String, description: "Id do usuário", example: "4f4e7edf-2c82-4a43-ab47-d49ed9d0cb0a" })
        async delete(@Param('id') id: string) {
            return this.userService.remove(id)
        }
}