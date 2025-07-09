import { PartialType } from '@nestjs/mapped-types';
import { CreateRastreamentoStatusDto } from './create-rastreamento-status.dto';

export class UpdateRastreamentoStatusDto extends PartialType(CreateRastreamentoStatusDto) {}
