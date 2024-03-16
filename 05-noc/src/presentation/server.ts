import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {
  public static start() {
    console.log('Servidor Corriendo...');

    const emailService = new EmailService();
    //enviar email
    // emailService.sendEmail({
    //   to: 'gfxargentina@gmail.com',
    //   subject: 'Test Nodemailer',
    //   htmlBody: `<h2>Logs de Sistema NOC - Nodemailer</h2>`,
    // });

    //enviar email con attachements
    emailService.sendEmailWithFileSystemLogs(['gfxargentina@gmail.com']);

    // CronService.createJob('*/3 * * * * *', () => {
    //   const url = 'https://google.com';

    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is up!!`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
