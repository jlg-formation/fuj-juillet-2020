import {MongoClient} from 'mongodb';
import {DbServerOptions} from './interfaces/DbServerOptions';

export class DbServer {
  options: DbServerOptions = {
    uri: 'mongodb://localhost/gestion-stock',
  };
  client: MongoClient;
  constructor(options: Partial<DbServerOptions>) {
    this.options = {...this.options, ...options};
    this.client = new MongoClient(this.options.uri);
  }
  async start() {
    try {
      await this.client.connect();
      const databasesList = await this.client.db().admin().listDatabases();
      console.log('databasesList: ', databasesList);
    } catch (err) {
      console.log('err: ', err);
      await this.client.close();
    }
  }
  async stop() {
    await this.client.close();
  }
}
