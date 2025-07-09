import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { EntregadoresService } from "./entregadores.service";
import { CreateEntregadorDto } from "./dto/create-entregador.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { UpdateEntregadorDto } from "./dto/update-entregador.dto";

@Controller('entregadores')
export class EntregadoresController {
    constructor(private readonly entregadoresService: EntregadoresService) {}

    @Get()
    findAllTasks(@Query() paginationDto: PaginationDto) {
      return this.entregadoresService.findAll(paginationDto);
    }

    @Get(':id')
    findOneTasks(@Param('id', ParseIntPipe) id: number) {
      return this.entregadoresService.findOne(id);
    }

    @Post()
    createTasks(@Body() createEntregadorDto: CreateEntregadorDto) {
      return this.entregadoresService.create(createEntregadorDto);
    }

    @Patch(':id')
    updateTask(@Param('id', ParseIntPipe) id: number, @Body() updateEntregadorDto: UpdateEntregadorDto) {
      return this.entregadoresService.update(id, updateEntregadorDto);
    }

    @Delete(':id')
    removeTask(@Param('id', ParseIntPipe) id: number) {
      return this.entregadoresService.remove(id);
    }
}