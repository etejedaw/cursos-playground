import { IsNotEmpty, Length, IsUrl } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  @Length(1, 15)
  title: string;

  @IsNotEmpty()
  @Length(1, 50)
  description: string;

  @IsUrl()
  src: string;
}
