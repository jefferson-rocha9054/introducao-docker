
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
    @ApiProperty({ example: "jefferson@gmail.com", description: "Email de um usuário existente" })
    @IsEmail({}, { message: 'O email precisa ser válido' })
    @IsNotEmpty({ message: "O email é obrigatório" })
    email: string;

    @ApiProperty({ example: "senha123", description: "Senha correta do usuário" })
    @IsString({ message: "A senha precisa ser textual." })
    @IsNotEmpty({ message: "A senha é obrigatório" })
    password: string;
}