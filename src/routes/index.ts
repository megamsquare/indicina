import express from 'express';
import shortUrl_route from './shortURL.route';

const routers = express.Router();

// Mount the individual routes here
routers.use('/', shortUrl_route);

// Export the routes
export default routers;