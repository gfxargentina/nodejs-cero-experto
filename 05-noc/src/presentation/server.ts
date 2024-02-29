import { CronService } from './cron/cron-service';

export class Server {
  public static start() {
    console.log('Servidor Corriendo...');
    CronService.createJob('* * * * * *', () => {
      const date = new Date();
      console.log('every second', date);
    });
  }
}
