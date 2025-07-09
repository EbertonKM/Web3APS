import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRastreamentoStatusDto } from './dto/create-rastreamento-status.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class RastreamentoStatusService {
  constructor(private readonly prismaService: PrismaService) { }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto

    return await this.prismaService.rastreamentoStatus.findMany({
      take: limit,
      skip: offset,
      include: {
        encomenda: true,
      },
    });
  }

  async findByEncomendaId(id: number, paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto
    
    return await this.prismaService.rastreamentoStatus.findMany({
      where: {
        encomendaId: id
      },
      take: limit,
      skip: offset,
      include: {
        encomenda: true,
      },
    });
  }

  async create(createRastreamentoDto: CreateRastreamentoStatusDto) {
    try {
      const newRastreamento = await this.prismaService.rastreamentoStatus.create({
        data: {
          ...createRastreamentoDto,
        }
      })
      return newRastreamento
    } catch (e) {
      throw new HttpException("Não foi possível cadastrar o Rastreamento", HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number) {
    try {
      const findRastreamento = await this.prismaService.rastreamentoStatus.findFirst({
        where: {
          id: id
        }
      })
      if (!findRastreamento)
        throw new HttpException("Essa encomenda não existe", HttpStatus.NOT_FOUND)

      await this.prismaService.rastreamentoStatus.delete({
        where: {
          id: findRastreamento.id
        }
      })
      return "Rastreamento excluído com sucesso"
    } catch (e) {
      throw new HttpException("Não foi possível deletar o rastreamento", HttpStatus.BAD_REQUEST)
    }
  }
}
