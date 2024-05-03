import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log-datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

//aqui le decimos a la aplicacion donde guardar los logs
const LogRepository = new LogRepositoryImpl(
  //new FileSystemDatasource()
  new MongoLogDatasource()
);

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log('Servidor Corriendo...');

    //const emailService = new EmailService(fileSystemLogRepository);
    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository
    // ).execute(['gfxargentina@gmail.com'])

    //enviar email
    // emailService.sendEmail({
    //   to: 'gfxargentina@gmail.com',
    //   subject: 'Test Nodemailer',
    //   htmlBody: `<h2>Logs de Sistema NOC - Nodemailer</h2>`,
    // });

    //enviar email con attachements
    //emailService.sendEmailWithFileSystemLogs(['gfxargentina@gmail.com']);

    // CronService.createJob('*/3 * * * * *', () => {
    //   const url = 'https://tarjetasanimadas.com.ar';

    //   new CheckService(
    //     LogRepository,
    //     () => console.log(`${url} is up!!`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
