import { Module } from "@nestjs/common";
import { EntregadoresController } from "./entregadores.controller";
import { EntregadoresService } from "./entregadores.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [EntregadoresController],
    providers: [EntregadoresService]
})
export class EntregadoresModule {}