import fs from 'fs';
import { SaveFile } from './save-file.use-case';

describe('SaveFileUseCase', () => {
  //   //antes de cada prueba borrar la carpeta outputs
  //   beforeEach(() => {
  //     //clean up
  //     fs.rmSync('outputs', { recursive: true });
  //   });

  //despues de cada prueba borrar la carpeta outputs
  afterEach(() => {
    //clean up
    fs.rmSync('outputs', { recursive: true });
  });

  it('should save file with default values', () => {
    const saveFile = new SaveFile();
    const filePath = 'outputs/table.txt';
    const options = {
      fileContent: 'test content',
    };

    const result = saveFile.execute(options);

    expect(result).toBe(true);

    const fileExists = fs.existsSync(filePath);

    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

    //verifica si el archivo existe
    expect(fileExists).toBe(true);
    //verifica el contenido del archivo
    expect(fileContent).toBe(options.fileContent);
  });
});
