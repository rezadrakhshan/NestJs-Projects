import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';

@Module({
  exports:[PdfService],
  providers: [PdfService],
})
export class PdfModule {}
