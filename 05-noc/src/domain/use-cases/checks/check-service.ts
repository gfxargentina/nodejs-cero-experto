interface CheckServiceUseCase {
  //recibe una url y devuelve una promesa
  execute(url: string): Promise<boolean>;
}
//caso de uso que revisa cualquier url
//si la url no responde tira error

export class CheckService implements CheckServiceUseCase {
  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      console.log(`${url} is up!`);
      return true;
    } catch (error) {
      console.log(`${error}`);
      return false;
    }
  }
}
