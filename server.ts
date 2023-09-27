import express from 'express';

import helmet from 'helmet';
import rate_limit from 'express-rate-limit';
import bodyParser from 'body-parser';
// import routers from './src/routes';

// import Middleware from './src/middleware';


const app = express();

// Rate limiting
app.set('trust proxy', 1);
app.use(
    rate_limit({
        windowMs: 15 * 60 * 1000,
        max: 1000,
        message: "You can't make any more request at the moment, try again later"
    })
);

app.use(bodyParser.json());

// app.use(express.urlencoded({ extended: true}));

app.use(helmet());

// Routers
// app.use('/api/v1', routers)

// Page not found route
// app.use(Middleware.NotFoundMiddleware)

// Export the app as the default export
export default app;