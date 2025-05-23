import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  text: string;
  @IsOptional()
  @IsBoolean()
  isCompleted: boolean;
}
