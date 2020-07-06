import mongoose from 'mongoose';
import _debug from 'debug';
import config from './config';

const debug = _debug('db');

/**
 * Establishes a connection to MongoDB if one does not already exist.
 */
export default async (dbName?:string, dbUrl?:string) => {
  if (mongoose.connections[0].readyState) return;

  const url = dbUrl || config.dbUrl;
  const name = dbName || config.dbName;

  debug('Connecting to database...');

  await mongoose
    .connect(url, {
      dbName: name,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .catch((error) => {
      debug('Database connection failed. ↓');
      debug(` > ${error}`);
      throw error;
    })
    .then(() => {
      debug('Database connected.');
    });
};
