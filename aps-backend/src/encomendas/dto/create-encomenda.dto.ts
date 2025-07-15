import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEncomendaDto {
    @IsString({message: "A origem precisa ser um texto"})
    @IsNotEmpty({message: "A origem não pode ser vazia"})
    readonly origem: string;

    @IsString({message: "O destino precisa ser um texto"})
    @IsNotEmpty({message: "O destino não pode ser vazio"})
    readonly destino: string;

    @IsNumber()
    @IsNotEmpty()
    readonly entregadorId: number;
}