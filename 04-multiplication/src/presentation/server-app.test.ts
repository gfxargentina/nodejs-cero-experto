import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { Server } from './server-app';

describe('Server App', () => {
  //objeto global para usar en todas las pruebas
  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileDestination: 'test-destination',
    fileName: 'test-filename',
  };

  it('should create Server instance', () => {
    const serverApp = new Server();
    expect(serverApp).toBeInstanceOf(Server);
    expect(typeof Server.run).toBe('function');
  });

  it('should run server with options', () => {
    //     //espia el console log
    //     const logSpy = jest.spyOn(console, 'log');
    //      //espia el caso de uso para crear archivos
    //     const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
    //      //espia el caso de uso para guardar archivos
    //     const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');
    //     Server.run(options);
    //     //prueba que el console.log haya sido llamado 2 veces
    //     expect(logSpy).toHaveBeenCalledTimes(2);
    //     expect(logSpy).toHaveBeenCalledWith('Servidor Corriendo...');
    //     expect(logSpy).toHaveBeenCalledWith('archivo creado');
    //     //prueba los casos de uso hayan sido llamados
    //     expect(createTableSpy).toHaveBeenCalledTimes(1);
    //     expect(createTableSpy).toHaveBeenCalledWith({
    //       base: options.base,
    //       limit: options.limit,
    //     });
    //     expect(saveFileSpy).toHaveBeenCalledTimes(1);
    //     expect(saveFileSpy).toHaveBeenCalledWith({
    //       fileContent: expect.any(String),
    //       fileDestination: options.fileDestination,
    //       fileName: options.fileName,
    //     });
  });

  it('should run with custom values mocked', () => {
    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
    const saveFileMock = jest.fn();

    console.log = logMock;
    console.error = logErrorMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    Server.run(options);

    expect(logMock).toHaveBeenCalledWith('Servidor Corriendo...');
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
  });
});
