import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

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
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //attachements
  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'Logs del Servidor';
    const htmlBody = `<h2>Logs del Sistema NOC</h2>`;

    const attachments: Attachment[] = [
      { filename: 'logs-all.log', path: '../../../logs/logs-low.log' },
      { filename: 'logs-high.log', path: '../../../../logs/logs-high.log' },
    ];

    return this.sendEmail({
      to,
      subject,
      attachments,
      htmlBody,
    });
  }
}
