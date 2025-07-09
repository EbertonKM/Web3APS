import { Module } from "@nestjs/common";
import { EncomendasController } from "./encomendas.controller";
import { EncomendasService } from "./encomendas.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [EncomendasController],
    providers: [EncomendasService]
})
export class EncomendaModule {}