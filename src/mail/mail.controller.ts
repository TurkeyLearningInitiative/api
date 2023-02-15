import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '~/authentication';
import RoleGuard from '~/authentication/guards/role.guard';
import { Roles } from '~/common/constants';
import { SendEmailDTO } from './dto';
import { MailService } from './mail.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @UseGuards(RoleGuard(Roles.Admin))
  @UseGuards(AccessTokenGuard)
  @ApiExcludeEndpoint()
  @Post('send-email')
  /* TODO: implement multiple email sending */
  async sendEmail(@Body() params: SendEmailDTO) {
    return { message: 'Email sent' };
  }
}
