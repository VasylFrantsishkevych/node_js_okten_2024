import express, {NextFunction, Request, Response } from "express";

import { ApiError } from "./errors/api-error";
import { userRouter } from "./routers/user.router";
import { configs } from "./config/configs";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("*", (req:Request, res: Response, next: NextFunction) => {
   console.log(`${req.method} ${req.path}`);
   next();
});

app.use('/users', userRouter)

app.use('*', (error: ApiError, req:Request, res: Response, next: NextFunction) => {
   res.status(error.status || 500).send(error.message);
});

process.on('uncaughtException', (error) => {
   console.error('uncaughtException', error.message, error.stack);
   process.exit(1)
})

app.listen(configs.APP_PORT, async () => {
   await mongoose.connect(configs.MONGO_URI);
   console.log(`Server is running on http://${configs.APP_HOST}:${configs.APP_PORT}`);
});


// tsc --init - створює файл tsconfig
// npm i -D 
// @types/express - типи для express
// @types/node - типи для node
// rimraf - удаляє dist
// tsc-watch - 
// ts-node - 
// nodemon - 

// для лінтера 
// eslint --init - створить файл лінтера
// npm i -D 
// @typescript-eslint/eslint-plugin 
// @typescript-eslint/parser 
// eslint eslint-plugin-import 
// eslint-config-prettier 
// eslint-plugin-prettier 
// eslint-plugin-simple-import-sort 
// prettier