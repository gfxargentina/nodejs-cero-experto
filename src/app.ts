import { yarg } from './config/plugins/yargs.plugin';
import { Server } from './presentation/server-app';

//funcion anonima auto-invocada asincrona, para poder ejectur codigo asincrono en archivo principal
// () los parentesis al final invocan(ejecutan) la funcion
(async () => {
  await main();
})();

async function main() {
  const { b: base, l: limit, s: showTable } = yarg;

  Server.run({ base, limit, showTable: true });

  console.log('main ejecutado');
}
