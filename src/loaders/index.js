import expressLoader from './express';
import databaseLoader from './database';

export default async ({app}) => {
  try{
    await databaseLoader();
    expressLoader({app});
  }catch(error){
    throw error;
  }
}