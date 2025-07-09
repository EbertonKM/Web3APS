import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRastreamentoStatusDto {
    @IsString({message: "A localização precisa ser um texto"})
    @IsNotEmpty({message: "A localização não pode ser vazia"})
    readonly localizacao: string;

    @IsString({message: "O stauts precisa ser um texto"})
    @IsNotEmpty({message: "O stauts não pode ser vazio"})
    readonly status: string;

    @IsNumber()
    @IsNotEmpty()
    readonly encomendaId: number;
}
