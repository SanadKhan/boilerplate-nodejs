import express from 'express';
import dotenv from 'dotenv';
import logger from './loaders/logger';

const startServer = async () => {
  try{
    dotenv.config();
    const app = express();
    await require('./loaders').default({app});

    const PORT = process.env.PORT || 8080;
  
    app.listen(PORT, () => {
      console.log(`
      ################################################
        Server listening on port: ${PORT}
      ################################################
      `);
    });
  }catch(error){
    logger.fatal(error);
  }
}

startServer();