import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronService } from './cron/cron-service';

export class clsServer {
  public static start() {
    console.log('Servidor Corriendo...');
    CronService.createJob('*/3 * * * * *', () => {
      const url = 'https://google.com';

      new CheckService(
        () => console.log(`${url} is up!!`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
