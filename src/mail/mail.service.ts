import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendVerificationMail(params: {
    name: string;
    email: string;
    verificationNumber: string;
  }) {
    const { email, ...context } = params;

    await this.mailService.sendMail({
      to: email,
      from: process.env.SMTP_FROM,
      subject: 'Email doğrulama kodunuz',
      template: './email_verify.html',
      context,
    });
  }
}
