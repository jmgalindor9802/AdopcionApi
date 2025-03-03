import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, Length, IsNumberString } from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly apellido: string;

  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  @Length(6, 12) 
  @ApiProperty()
  readonly doc_identidad: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly usuario: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly correo: string;

  @IsString()
  @IsNotEmpty()  
  @ApiProperty()
  readonly num_contacto: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly registrado: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly tipo_doc: string;  

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly fk_pais: number;  
}

export class UpdateEstudianteDto extends PartialType(CreateEstudianteDto) {}
