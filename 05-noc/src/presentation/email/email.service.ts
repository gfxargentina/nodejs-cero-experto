import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor(private readonly logRepository: LogRepository) {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      //envia el email
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });

      console.log(sentInformation);
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Email sent',
        origin: 'email.service.ts',
      });
      this.logRepository.saveLog(log);
      return true;
    } catch (error) {
      console.log(error);

      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'Email Not sent',
        origin: 'email.service.ts',
      });
      this.logRepository.saveLog(log);

      return false;
    }
  }

  //attachements
  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'Logs del Servidor';
    const htmlBody = `<h2>Logs del Sistema NOC</h2>`;

    const attachments: Attachment[] = [
      { filename: 'logs-all.log', path: './logs/logs-low.log' },
      { filename: 'logs-high.log', path: './logs/logs-high.log' },
    ];

    return this.sendEmail({
      to,
      subject,
      attachments,
      htmlBody,
    });
  }
}
