import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

//interface son reglas que se le ponen a un objeto
interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
  fileDestination: string;
  fileName: string;
}

export class Server {
  static run({
    base,
    limit,
    showTable,
    fileName,
    fileDestination,
  }: RunOptions) {
    console.log('Servidor Corriendo...');

    const table = new CreateTable().execute({ base, limit });
    const fileCreated = new SaveFile().execute({
      fileContent: table,
      fileDestination,
      fileName,
    });

    if (showTable) console.log(table);

    fileCreated
      ? console.log('archivo creado')
      : console.error('el archivo no se creo');
  }
}
