process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  endpointBaseUrl: process.env.NODE_ENV != 'production' ? 'http://localhost:8080' : 'api.storeways.io',
  isProduction: process.env.NODE_ENV == 'production',
  clientbaseUrl: process.env.CLIENT_URL || 'http://localhost:3001',
  databaseURL: process.env.POSTGRES_URI,
  JWTSecret: process.env.JWT_SECRET,
  ZOHO: {
    refreshToken: process.env.ZOHO_REFRESH_TOKEN,
    clientId: process.env.ZOHO_CLIENT_ID,
    secret: process.env.ZOHO_SECRET_KEY
  }
};