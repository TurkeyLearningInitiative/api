import { IsArray, IsIn, IsObject, IsString } from 'class-validator';
import { EmailTemplateName, templates } from '~/common/constants';

export class SendEmailDTO {
  @IsArray()
  @IsString({ each: true })
  receivers: string[];

  @IsString()
  subject: string;

  @IsString()
  @IsIn(Object.keys(templates))
  templateName: EmailTemplateName;

  @IsArray()
  @IsObject({ each: true })
  context: { [name: string]: any }[];
}
