import { envs } from './config/plugins/envs.plugin';
import { Server } from './presentation/server';

//funcion anonima autoinvocada asyncrona
(async () => {
  main();
})();

function main() {
  //Server.start();
  console.log(envs);
}
