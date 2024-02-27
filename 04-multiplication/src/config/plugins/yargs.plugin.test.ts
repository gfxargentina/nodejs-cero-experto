//import {yarg } from './yargs.plugin'

//funcion para simular la ejecucion de la terminal
//linea 13
const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];

  const { yarg } = await import('./yargs.plugin');
  return yarg;
};

describe('test args.plugins', () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  it('should return default values', async () => {
    const argv = await runCommand([
      '-b',
      '5',
      '-l',
      '10',
      '-s',
      '-n',
      'custom-name',
      '-d',
      'custom-dir',
    ]);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: true,
        n: 'multiplication-table',
        d: 'outputs',
      })
    );
  });

  it('should return configuration with custom values', async () => {
    const argv = await runCommand([
      '-b',
      '8',
      '-l',
      '20',
      '-s',
      '-n',
      'custom-name',
      '-d',
      'custom-dir',
    ]);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 8,
        l: 20,
        s: true,
        n: 'custom-name',
        d: 'custom-dir',
      })
    );
  });
});
