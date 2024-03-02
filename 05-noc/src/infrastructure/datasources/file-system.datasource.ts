import fs from 'fs';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export class FileSystemDatasource implements LogDatasource {
  //Se declaran algunas propiedades de solo lectura que contienen rutas de archivo relacionadas con los logs.
  private readonly logPath = 'logs/';
  private readonly allLogsPath = 'logs/logs-low.log';
  private readonly mediumLogsPath = 'logs/logs-medium.log';
  private readonly highLogsPath = 'logs/logs-high.log';

  //Se define un constructor que llama al método createLogsFile()
  constructor() {
    this.createLogsFile();
  }

  //Este método verifica si el directorio especificado en logPath existe. Si no existe, lo crea.
  //Luego, utiliza un forEach para iterar sobre un array de rutas de logs (allLogsPath, mediumLogsPath, highLogsPath).
  //Para cada ruta, verifica si el archivo existe. Si no existe, crea un archivo vacío en esa ruta.
  private createLogsFile = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    //usa el forEach para crear los directorios
    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (fs.existsSync(path)) return;
        fs.writeFileSync(path, '');
      }
    );
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    //Convierte el objeto newLog a formato JSON
    const logAsJson = `${JSON.stringify(newLog)}`;

    fs.appendFileSync(this.allLogsPath, logAsJson);

    //Agrega el registro de log al archivo de logs correspondiente (allLogsPath, mediumLogsPath, highLogsPath)
    //según el nivel de gravedad del log (level)
    if (newLog.level === LogSeverityLevel.low) return;

    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
  }

  //Este método privado toma una ruta de archivo como argumento y lee los logs desde ese archivo.
  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, 'utf-8');
    //son lo mismo linea 50-52
    // const logs = content.split('\n').map(LogEntity.fromJson);
    //Divide el contenido del archivo en líneas y los convierte en objetos LogEntity
    const logs = content.split('\n').map((log) => LogEntity.fromJson(log));

    return logs;
  };

  //Este método asincrónico toma un nivel de gravedad de log (severityLevel) como argumento.
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    //Lee los registros de log desde el archivo correspondiente (allLogsPath, mediumLogsPath, highLogsPath)
    //según el nivel de gravedad proporcionado.
    //Devuelve los registros de log recuperados como un array de objetos LogEntity.
    // Si el nivel de gravedad no está reconocido, lanza un error.
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);

      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);

      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);

      default:
        throw new Error(`${severityLevel} not implemented`);
    }
  }
}
