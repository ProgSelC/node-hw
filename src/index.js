const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const userRouter = require('./routers/userRouter');
const groupRouter = require('./routers/groupRouter');
const authRouter = require('./routers/authRouter');
const swaggerDocument = require('./config/swaggerConfig');
const serviceLogger = require('./middleware/serviceLogger')
const errorHandler = require('./middleware/errorHandler');
const authHandler = require('./middleware/authHandler');
const { connect } = require('./data-access/connection');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
    .use(serviceLogger)
    .use(cors());

app.use('/login', authRouter)
    .use('/users', authHandler, userRouter)
    .use('/groups', authHandler, groupRouter)
    .use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(errorHandler)

connect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Example app is listening at http://localhost:${port}`);
        });
    })
    .catch(error => console.error(`Error occured while connectiong to database: ${error}`));

