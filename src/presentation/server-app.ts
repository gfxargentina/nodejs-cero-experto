//interface son reglas que se le ponen a un objeto
interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
}

export class Server {
  static run(options: RunOptions) {
    console.log(options);
    console.log('Servidor Corriendo...');
  }
}
