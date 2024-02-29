interface CheckServiceUseCase {
  //recibe una url y devuelve una promesa
  execute(url: string): Promise<boolean>;
}

//esta es la informacion que puedes inyectar en class checkservice
type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

//caso de uso que revisa cualquier url
//si la url no responde tira error
export class CheckService implements CheckServiceUseCase {
  //inyeccion de dependencias
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      this.successCallback();

      return true;
    } catch (error) {
      this.errorCallback(`${error}`);
      return false;
    }
  }
}
