import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import moviesRouter from './api/movies';   //import movies router
import actorsRouter from './api/actors';
import reviewRouter from './api/reviews'
import authenticate from './authenticate';
import './db';
import defaultErrHandler from './errHandler'
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

dotenv.config();

const path = require('path');
const swaggerDocument = YAML.load(path.join(__dirname, './web-ca2.yaml'));
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use(defaultErrHandler);
app.use('/api/movies',  moviesRouter);
app.use('/api/actors',  actorsRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.info(`Server running at ${port}`);
});
