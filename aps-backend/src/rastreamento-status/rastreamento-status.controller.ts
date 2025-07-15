import { Controller, Get, Post, Body, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { RastreamentoStatusService } from './rastreamento-status.service';
import { CreateRastreamentoStatusDto } from './dto/create-rastreamento-status.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('rastreamento-status')
export class RastreamentoStatusController {
  constructor(private readonly rastreamentoStatusService: RastreamentoStatusService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.rastreamentoStatusService.findAll(paginationDto);
  }
  
  @Get(':id')
  findByEncomendaId(@Param('id', ParseIntPipe) id: number, @Query() paginationDto: PaginationDto) {
    return this.rastreamentoStatusService.findByEncomendaId(id, paginationDto);
  }

  @Post()
  create(@Body() createRastreamentoStatusDto: CreateRastreamentoStatusDto) {
    return this.rastreamentoStatusService.create(createRastreamentoStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rastreamentoStatusService.remove(+id);
  }
}
