import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as moment from 'moment';

@Injectable()
export class PdfService {
  async generatePdf(invoice): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      doc
        .fontSize(26)
        .fillColor('#2c3e50')
        .text('INVOICE', { align: 'center', underline: true })
        .moveDown(1);

      doc.fontSize(12).fillColor('#000');
      doc.text(`Invoice ID: ${invoice._id}`);
      doc.text(`Status: ${invoice.status}`);
      doc.text(`Issue Date: ${moment(invoice.issueDate).format('YYYY-MM-DD')}`);
      doc.text(`Due Date: ${moment(invoice.dueDate).format('YYYY-MM-DD')}`);
      doc.moveDown();

      const startY = doc.y + 10;
      const colWidths = {
        description: 200,
        quantity: 70,
        unitPrice: 100,
        total: 100,
      };
      const startX = 50;

      const drawTableRow = (y, row, isHeader = false) => {
        doc.font(isHeader ? 'Helvetica-Bold' : 'Helvetica').fontSize(12);
        doc.text(row.description, startX, y, { width: colWidths.description });
        doc.text(row.quantity, startX + colWidths.description, y, {
          width: colWidths.quantity,
          align: 'right',
        });
        doc.text(
          `$${row.unitPrice}`,
          startX + colWidths.description + colWidths.quantity,
          y,
          {
            width: colWidths.unitPrice,
            align: 'right',
          },
        );
        doc.text(
          `$${row.unitPrice * row.quantity}`,
          startX +
            colWidths.description +
            colWidths.quantity +
            colWidths.unitPrice,
          y,
          {
            width: colWidths.total,
            align: 'right',
          },
        );
      };

      drawTableRow(
        startY,
        {
          description: 'Description',
          quantity: 'Qty',
          unitPrice: 'Unit Price',
          total: 'Total',
        },
        true,
      );

      doc
        .moveTo(startX, startY + 15)
        .lineTo(550, startY + 15)
        .strokeColor('#aaa')
        .stroke();

      let y = startY + 25;
      invoice.items.forEach((item) => {
        drawTableRow(y, item);
        y += 20;
      });

      doc
        .font('Helvetica-Bold')
        .fontSize(14)
        .text(`Total: $${invoice.total}`, startX, y + 10, {
          width: 500,
          align: 'right',
        });

      if (invoice.notes) {
        doc
          .moveDown(2)
          .font('Helvetica-Bold')
          .fontSize(12)
          .text('Notes:', { underline: true })
          .font('Helvetica')
          .text(invoice.notes, { align: 'justify' });
      }

      doc.end();
    });
  }
}
