const express = require('express');
const swaggerUi = require('swagger-ui-express');
const userRouter = require('./routers/userRouter');
const swaggerDocument = require('./config/swaggerConfig.json');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();
const port = process.env.PORT || 3000;


app.use('/users', userRouter)
    .use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .listen(port, () => {
        console.log(`Example app is listening at http://localhost:${port}`);
    });
