//import {yarg } from './yargs.plugin'

//funcion para simular la ejecucion de la terminal
//linea 13
const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];

  const { yarg } = await import('./yargs.plugin');
  return yarg;
};

describe('test args.plugins', () => {
  it('should return default values', async () => {
    const argv = await runCommand(['-b', '5']);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: 'multiplication-table',
        d: 'outputs',
      })
    );
  });
});
