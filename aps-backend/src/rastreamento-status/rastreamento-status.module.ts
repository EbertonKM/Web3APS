import { Module } from '@nestjs/common';
import { RastreamentoStatusService } from './rastreamento-status.service';
import { RastreamentoStatusController } from './rastreamento-status.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RastreamentoStatusController],
  providers: [RastreamentoStatusService],
})
export class RastreamentoStatusModule {}
