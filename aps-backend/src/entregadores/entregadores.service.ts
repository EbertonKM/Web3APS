import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateEntregadorDto } from "./dto/create-entregador.dto";
import { UpdateEntregadorDto } from "./dto/update-entregador.dto";

@Injectable()
export class EntregadoresService {
    constructor(private readonly prismaService: PrismaService) {}
    
    async findAll(paginationDto: PaginationDto) {
        const {limit = 10, offset = 0} = paginationDto

        const allEntregadors = await this.prismaService.entregador.findMany({
            take: limit,
            skip: offset,
            orderBy: {
                nome: 'asc'
            }
        })
        return allEntregadors
    }

    async findOne(id: number) {
        const entregador = await this.prismaService.entregador.findFirst({
            where: {
                id: id
            }
        })
        if (entregador?.id) return entregador
        throw new HttpException("Esse entregador não existe", HttpStatus.NOT_FOUND)
    }

    async create(createEntregadorDto: CreateEntregadorDto) {
        try {
            const newEntregador = await this.prismaService.entregador.create({
                data: {
                    nome: createEntregadorDto.nome,
                    telefone: createEntregadorDto.telefone
                }
            })
            return newEntregador
        }catch(e) {
            throw new HttpException("Não foi possível cadastrar o entregador", HttpStatus.BAD_REQUEST)
        }
    }

    async update(id: number, updateEntregadorDto: UpdateEntregadorDto) {
        try {
            const findEntregador = await this.prismaService.entregador.findFirst({
                where: {
                    id: id
                }
            })
            if(!findEntregador)
                throw new HttpException("Esse entregador não existe", HttpStatus.NOT_FOUND)

            const entregador = await this.prismaService.entregador.update({
                where: {
                    id: findEntregador.id
                },
                data: {
                    nome: updateEntregadorDto.nome ? updateEntregadorDto.nome : findEntregador.nome,
                    telefone: updateEntregadorDto.telefone ? updateEntregadorDto.telefone : findEntregador.telefone,
                    ativo: updateEntregadorDto.ativo ? updateEntregadorDto.ativo : findEntregador.ativo
                }
            })
            return entregador
        }catch(e) {
            throw new HttpException("Não foi possível atualizar o entregador", HttpStatus.BAD_REQUEST)
        }
    }

    async remove(id: number) {
        try {
            const findEntregador = await this.prismaService.entregador.findFirst({
                where: {
                    id: id
                }
            })
            if(!findEntregador)
                throw new HttpException("Esse entregador não existe", HttpStatus.NOT_FOUND)

            await this.prismaService.entregador.delete({
                where: {
                    id: findEntregador.id
                }
            })
            return "Entregador excluído com sucesso"
        }catch(e) {
            throw new HttpException("Não foi possível deletar o entregador", HttpStatus.BAD_REQUEST)
        }
    }
}