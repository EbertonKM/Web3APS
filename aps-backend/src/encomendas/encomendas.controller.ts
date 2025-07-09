import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { EncomendasService } from "./encomendas.service";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { CreateEncomendaDto } from "./dto/create-encomenda.dto";
import { UpdateEncomendaDto } from "./dto/update-encomenda.dto";

@Controller('encomendas')
export class EncomendasController {
    constructor(private readonly encomendasService: EncomendasService) {}

    @Get()
    findAllTasks(@Query() paginationDto: PaginationDto) {
      return this.encomendasService.findAll(paginationDto);
    }

    @Get(':id')
    findOneTasks(@Param('id', ParseIntPipe) id: number) {
      return this.encomendasService.findOne(id);
    }

    @Post()
    createTasks(@Body() createEncomendaDto: CreateEncomendaDto) {
      return this.encomendasService.create(createEncomendaDto);
    }

    @Patch(':id')
    updateTask(@Param('id', ParseIntPipe) id: number, @Body() updateEncomendaDto: UpdateEncomendaDto) {
      return this.encomendasService.update(id, updateEncomendaDto);
    }

    @Delete(':id')
    removeTask(@Param('id', ParseIntPipe) id: number) {
      return this.encomendasService.remove(id);
    }
}