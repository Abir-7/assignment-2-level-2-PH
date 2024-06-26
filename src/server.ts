import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

async function main() {
  try {
    console.log(config.databaseUri);
    await mongoose.connect(config.databaseUri as string);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
