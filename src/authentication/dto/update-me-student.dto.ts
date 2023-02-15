import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  MinLength,
} from 'class-validator';

export class updateMeStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsObject()
  educationInfo: string;
}
