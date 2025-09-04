
import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class RegisterUserDto {
    @ApiProperty({ example: "Jefferson", description: "Nome do usuário" })
    @IsString()
    @IsNotEmpty({ message: "O nome é obrigatório" })
    name: string

    @ApiProperty({ example: "jefferson@gmail.com", description: "Email do usuário" })
    @IsEmail()
    @IsNotEmpty({ message: "O email é obrigatório" })
    email: string

    @ApiProperty({ example: "senha123", description: "Senha do usuário" })
    @IsString()
    @IsNotEmpty({ message: "A senha é obrigatório" })
    password: string

}