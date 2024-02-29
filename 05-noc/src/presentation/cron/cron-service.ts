import { CronJob } from 'cron';

type CronTime = string | Date;
//recibe una funcion, callback
type OnTick = () => void;

export class CronService {
  static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
    const job = new CronJob(
      //'* * * * * *', () => {
      //   const date = new Date();
      //   console.log('every second', date);
      // }
      cronTime,
      onTick
    );

    job.start();
    return job;
  }
}
