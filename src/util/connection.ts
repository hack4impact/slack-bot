import mongoose from 'mongoose';
import _debug from 'debug';

const debug = _debug('db');

/**
 * Establishes a connection to MongoDB if one does not already exist.
 */
export default async (dbName?:string, dbUrl?:string) => {
  if (mongoose.connections[0].readyState) return;

  const url = dbUrl || process.env.MONGODB_URI || 'mongodb://localhost:27017/bog-bot';
  const name = dbName || 'slack-bot';

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
