import express, { NextFunction, Request, Response } from 'express';
import db from './config/database.config';
import apiRoute from './api/route'

db.sync().then(() => {
	console.log("connected to db");
});

const app = express();
const port = 9000;

app.use(express.json());


app.use('/api/v1', apiRoute);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})