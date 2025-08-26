
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, isNumber, IsNumber, IsString} from "class-validator";

export class CreateBookDto {
    @ApiProperty({example: 'moby dick'})
    @IsString()
    @IsNotEmpty()
    nome: string

    @ApiProperty({example: 'Herman Melville.'})
    @IsString()
    @IsNotEmpty()
    autor: string

    @ApiProperty({example: 18-10-1851 })
    @IsNumber()
    @Type(() => Number)
    lancamento: number

}