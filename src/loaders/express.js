import express from 'express';
import cors from 'cors';
import routes from '../api/routes';
import loggerInstance from './logger';
import config from '../config';

export default ({app}) => {
  const logger = loggerInstance({name: 'Incoming Request'});
  const reqSerializer = (req) => {
    return {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body
    };
  }

  const whitelist = [config.clientbaseUrl];
  
  var corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

  app.enable('trust proxy');
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use((req, res, next) => {
    logger.info(reqSerializer(req));
    next();
  });
  app.use(routes);
}