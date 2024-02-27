import { Server } from './server-app';

describe('Server App', () => {
  it('should create serverApp instance', () => {
    const serverApp = new Server();
    expect(serverApp).toBeInstanceOf(Server);
    expect(typeof Server.run).toBe('function');
  });
});
