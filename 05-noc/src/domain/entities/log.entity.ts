export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public origin: string;
  public createdAt?: Date;

  constructor(options: LogEntityOptions) {
    //inicializa las variables
    const { message, level, origin, createdAt = new Date() } = options;

    this.message = message;
    this.level = level;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  //metodo - factory function
  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt, origin } = JSON.parse(json);

    const log = new LogEntity({ message, level, createdAt, origin });

    return log;
  };
}
