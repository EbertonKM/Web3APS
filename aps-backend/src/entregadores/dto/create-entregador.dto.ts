import { IsNotEmpty, IsNumber, IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateEntregadorDto {
    @IsString({message: "O nome precisa ser um texto"})
    @MinLength(5, {message: "O nome precisa ter no mínimo 5 caracteres"})
    @MaxLength(20, {message: "O nome pode ter no máximo 20 caracteres"})
    @IsNotEmpty({message: "O nome não pode ser vazio"})
    readonly nome: string;

    @IsString({message: "O número precisa ser um texto"})
    @Length(11, 11, {message: "Formato do número inválido"})
    @IsNotEmpty({message: "O número não pode ser vazio"})
    readonly telefone: string;
}