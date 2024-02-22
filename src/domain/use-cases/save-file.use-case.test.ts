import fs from 'fs';
import { SaveFile } from './save-file.use-case';

describe('SaveFileUseCase', () => {
  const customOptions = {
    fileContent: 'custom content',
    fileDestination: 'custom-outputs/file-destination',
    fileName: 'custom-table',
  };

  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

  //   //antes de cada prueba borrar la carpeta outputs
  //   beforeEach(() => {
  //     //clean up
  //     fs.rmSync('outputs', { recursive: true });
  //   });

  //despues de cada prueba borrar la carpeta outputs
  afterEach(() => {
    //para ver si la carpeta esta creada
    const outputsFolder = fs.existsSync('outputs');
    //clean up
    if (outputsFolder) fs.rmSync('outputs', { recursive: true });

    const customFolder = fs.existsSync(customOptions.fileDestination);
    if (customFolder)
      fs.rmSync(customOptions.fileDestination, { recursive: true });
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

  it('should save file with custom values', () => {
    const saveFile = new SaveFile();

    const result = saveFile.execute(customOptions);
    const fileExist = fs.existsSync(customFilePath);
    const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8' });

    expect(result).toBe(true);
    expect(fileExist).toBe(true);
    expect(fileContent).toBe(customOptions.fileContent);
  });
});
