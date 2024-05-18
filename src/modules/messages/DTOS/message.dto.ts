import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  chat_id: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // message_id: string;

}
