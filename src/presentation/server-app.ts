import { CreateTable } from '../domain/use-cases/create-table.use-case';

//interface son reglas que se le ponen a un objeto
interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
}

export class Server {
  static run({ base, limit, showTable }: RunOptions) {
    console.log('Servidor Corriendo...');

    const table = new CreateTable().execute({ base, limit });

    if (showTable) console.log(table);
  }
}
