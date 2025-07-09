import { PartialType } from "@nestjs/mapped-types";
import { CreateEntregadorDto } from "./create-entregador.dto";
import { IsBoolean } from "class-validator";

export class UpdateEntregadorDto extends PartialType(CreateEntregadorDto) {
    @IsBoolean({message: "O estado do entregador deve ser um booleano"})
    readonly ativo?: boolean;
}