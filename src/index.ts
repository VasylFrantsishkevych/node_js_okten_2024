import express, {NextFunction, Request, Response } from "express";

import { ApiError } from "./errors/api-error";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter)


// app.delete('/users/:userId', async (req: Request, res: Response, next: NextFunction) => {
//    try {
//       const users = await userService.getUsers();

//        const userId = Number(req.params.userId);
//        if (Number.isNaN(userId) || userId < 0 || !Number.isInteger(userId)) {
//          throw new Error('Wrong user Id')
//          return;
//       }

//        const userIndex = users.findIndex(user => user.id === userId);
//        if (userIndex === -1) {
//          throw new ApiError('User not found', 404);
//        }

//        users.splice(userIndex, 1);

//        await userService.saveNewUser(users);

//        res.sendStatus(204);
//    } catch (e) {
//       next(e)
//    }
// });

app.use('*', (error: ApiError, req:Request, res: Response, next: NextFunction) => {
   res.status(error.status || 500).send(error.message);
});

process.on('uncaughtException', (error) => {
   console.error('uncaughtException', error.message, error.stack);
   process.exit(1)
})

app.listen(5000, () => {
   console.log('Server is running on http://localhost:5000');
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