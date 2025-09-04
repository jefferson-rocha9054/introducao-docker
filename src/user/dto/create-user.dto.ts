import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: "Jefferson", description: "nome do usuário"})
    @IsString()
    @IsNotEmpty({message: "o nome e obrigatório"})
    name: string
    
    @ApiProperty({example: "jeffer@gmail.com", description: "email do usuario"})
    @IsEmail()
    @IsNotEmpty({message: "o email e obrigatório"})
    email: string

    @ApiProperty({example: "senha123", description: "senha do usuário"})
    @IsString()
    @IsNotEmpty({message: "a senha e obrigatório"})
    password: string
}