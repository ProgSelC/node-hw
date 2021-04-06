import express from 'express';
import swaggerUi from 'swagger-ui-express';
import userRouter from './routers/userRouter';
import swaggerDocument from './config/swaggerConfig';

const app = express();
const port = 3000;


app.use('/users', userRouter);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
