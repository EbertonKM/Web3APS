import { IsBoolean, IsString } from "class-validator";

export class UpdateEncomendaDto {
    @IsBoolean({message: "O estado de entrega precisa ser um booleano"})
    readonly entregue?: boolean;

    @IsString({message: "As observações precisam ser um texto"})
    readonly observacoes?: string;
}