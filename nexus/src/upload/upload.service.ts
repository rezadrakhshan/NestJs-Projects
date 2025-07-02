import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UploadService {
  private s3Client: S3Client;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: 'default',
      endpoint: this.configService.get<string>('LIARA_ENDPOINT')!,
      credentials: {
        accessKeyId: this.configService.get<string>('LIARA_ACCESS_KEY')!,
        secretAccessKey: this.configService.get<string>('LIARA_SECRET_KEY')!,
      },
    });
  }

  async uploadFile(file: Express.Multer.File, folder: string) {
    const bucket = this.configService.get<string>('LIARA_BUCKET_NAME');
    const fileExtension = file.originalname.split('.').pop();
    const newFileName = `${uuid()}.${fileExtension}`;
    const key = `${folder}/${newFileName}`;
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3Client.send(command);

    return {
      url: `${this.configService.get('LIARA_ENDPOINT')}/${key}`,
    };
  }
  async deleteFile(fileUrl: string): Promise<{ success: boolean }> {
    const bucket = this.configService.get<string>('LIARA_BUCKET_NAME');
    const endpoint = this.configService.get<string>('LIARA_ENDPOINT');

    const key = fileUrl.replace(`${endpoint}/`, '');

    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    try {
      await this.s3Client.send(command);
      return { success: true };
    } catch (error) {
      console.error('Delete Error:', error);
      return { success: false };
    }
  }
}
