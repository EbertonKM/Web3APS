import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { CreateEncomendaDto } from "./dto/create-encomenda.dto";
import { UpdateEncomendaDto } from "./dto/update-encomenda.dto";

@Injectable()
export class EncomendasService {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll(paginationDto: PaginationDto) {
        const {limit = 10, offset = 0} = paginationDto

        const allEncomendas = await this.prismaService.encomenda.findMany({
            take: limit,
            skip: offset,
            orderBy: {
                id: 'asc'
            }
        })
        return allEncomendas
    }

    async findOne(id: number) {
        const encomenda = await this.prismaService.encomenda.findFirst({
            where: {
                id: id
            }
        })
        if (encomenda?.id) return encomenda
        throw new HttpException("Essa encomenda não existe", HttpStatus.NOT_FOUND)
    }

    async create(createEncomendaDto: CreateEncomendaDto) {
        try {
            const newEncomenda = await this.prismaService.encomenda.create({
                data: {
                    origem: createEncomendaDto.origem,
                    destino: createEncomendaDto.destino,
                    entregadorId: createEncomendaDto.entregadorId,
                    entregue: false
                }
            })
            return newEncomenda
        }catch(e) {
            throw new HttpException("Não foi possível cadastrar a encomenda", HttpStatus.BAD_REQUEST)
        }
    }

    async update(id: number, updateEncomendaDto: UpdateEncomendaDto) {
        try {
            const findEncomenda = await this.prismaService.encomenda.findFirst({
                where: {
                    id: id
                }
            })
            if(!findEncomenda)
                throw new HttpException("Essa encomenda não existe", HttpStatus.NOT_FOUND)

            const encomenda = await this.prismaService.encomenda.update({
                where: {
                    id: findEncomenda.id
                },
                data: {
                    entregue: updateEncomendaDto.entregue ? updateEncomendaDto.entregue : findEncomenda.entregue,
                    observacoes: updateEncomendaDto.observacoes ? updateEncomendaDto.observacoes : findEncomenda.observacoes
                }
            })
            return encomenda
        }catch(e) {
            throw new HttpException("Não foi possível atualizar a encomenda", HttpStatus.BAD_REQUEST)
        }
    }

    async remove(id: number) {
        try {
            const findEncomenda = await this.prismaService.encomenda.findFirst({
                where: {
                    id: id
                }
            })
            if(!findEncomenda)
                throw new HttpException("Essa encomenda não existe", HttpStatus.NOT_FOUND)

            await this.prismaService.encomenda.delete({
                where: {
                    id: findEncomenda.id
                }
            })
            return "Encomenda excluída com sucesso"
        }catch(e) {
            throw new HttpException("Não foi possível deletar a encomenda", HttpStatus.BAD_REQUEST)
        }
    }
}