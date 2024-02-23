//las interfaces no son codigo de javascript
//las interfaces son reglas que los objetos tienen que cumplir,
//en este caso en la clase CreateTable el objeto execute
export interface CreateTableUseCase {
  //execute tiene que regrasar un string
  execute: (options: CreateTableOptions) => string;
}

//opciones de lo que tiene que recibir execute
export interface CreateTableOptions {
  base: number;
  limit?: number;
}

export class CreateTable implements CreateTableUseCase {
  //el constructor es el primer metodo que se llama cuando se crea una instancia de la clase
  constructor() {} //DI - Dependency Injection

  //en el execute se puede utilizar las dependencias que vienen del exterior - constructor DI
  //metodo:
  execute({ base, limit = 10 }: CreateTableOptions) {
    let outputMessage = '';
    for (let i = 1; i <= limit; i++) {
      outputMessage += `${base} x ${i} = ${base * i}`;
      if (i < limit) outputMessage += '\n';
    }

    return outputMessage;
  }
}
