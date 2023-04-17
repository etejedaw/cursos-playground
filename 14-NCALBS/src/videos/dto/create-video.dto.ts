import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsUrl } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  @Length(1, 15)
  title: string;

  @IsNotEmpty()
  @Length(1, 50)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  idCourse: string;
}
