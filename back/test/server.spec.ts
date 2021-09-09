import assert from 'assert';
import got from 'got';
import {WebServer} from '../src/WebServer';

describe('Server', () => {
  it('should start and stop', async function () {
    this.timeout(15000);
    const server = new WebServer({port: 3400});
    await server.start();
    const data = await got.get('http://localhost:3400/api/date').json();
    console.log('data: ', data);
    await server.stop();
    assert(data instanceof Object);
  });
});
