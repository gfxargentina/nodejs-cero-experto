import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository';
import { CronService } from './cron/cron-service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {
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
