const express = require('express');
const swaggerUi = require('swagger-ui-express');
const userRouter = require('./routers/userRouter');
const groupRouter = require('./routers/groupRouter');
const swaggerDocument = require('./config/swaggerConfig');
const errorHandler = require('./middleware/errorHandler');
const { connect } = require('./data-access/connection');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRouter)
    .use('/groups', groupRouter)
    .use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(errorHandler)

connect()
    .then(() => {
        app.listen(port, () => {
                console.log(`Example app is listening at http://localhost:${port}`);
            });
    })
    .catch(error => console.error(`Error occured while connectiong to database: ${error}`));

