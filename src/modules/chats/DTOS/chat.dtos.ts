// import { IsNotEmpty, IsArray } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

// export class CreateChatDto {
//   @ApiProperty()
//   @IsNotEmpty()
//   @IsArray()
//   members: Array<string>;
//   usernames : Array <string> ; 
// }
import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class MessageDto {
  @ApiProperty()
  @IsNotEmpty()
  user_name: string;

  @ApiProperty()
  @IsNotEmpty()
  message: string; 

  @ApiProperty()
  @IsNotEmpty()
  createDate: Date;
}

export class CreateChatDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true }) // Indique à class-validator de valider chaque élément du tableau
  @Type(() => MessageDto) // Indique à class-transformer de transformer chaque élément en MessageDto
  messages: MessageDto[];

  @ApiProperty()
  @IsArray()
  members: string[];

  @ApiProperty()
  @IsArray()
  usernames: string[];
}
