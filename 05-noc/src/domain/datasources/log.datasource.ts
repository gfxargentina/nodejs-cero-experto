import { LogEntity, LogSeverityLevel } from '../entities/log.entity';

export abstract class LogDatasource {
  //recibe un log, devuelve una promesa que se resolvera sin devolver ningun valor
  abstract saveLog(log: LogEntity): Promise<void>;
  //recibe la severidad del log y devuelve una promesa que resolvera devolviendo un array
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
