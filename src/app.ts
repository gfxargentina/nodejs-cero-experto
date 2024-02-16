import { yarg } from './config/plugins/yargs.plugin';

//funcion anonima auto-invocada asincrona, para poder ejectur codigo asincrono en archivo principal
// () los parentesis al final invocan(ejecutan) la funcion
(async () => {
  await main();
})();

async function main() {
  console.log('main ejecutado');
}
