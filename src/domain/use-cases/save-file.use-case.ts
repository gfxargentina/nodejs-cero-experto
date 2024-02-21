import fs from 'fs';

export interface SaveFileUseCase {
  execute: (options: Options) => boolean;
}

export interface Options {
  fileContent: string;
  fileDestination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor() {}

  execute({
    fileContent,
    fileDestination = 'outputs',
    fileName = 'table',
  }: Options): boolean {
    try {
      //crear el directorio, la opcion recursive permite crear mas subdirectorios
      fs.mkdirSync(fileDestination, { recursive: true });

      //grabar en archivo de salida
      fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);
      //console.log('archivo creado');
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
