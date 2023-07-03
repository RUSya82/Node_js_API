import express, { Request, Response, NextFunction} from 'express';
import {userRouter} from "./users/users.js";

const port = 8000;
const app = express();

app.use((req,res,next) => {
    console.log(`Time: ${Date.now()}`);
    next();
})
app.all('/hello', (req,res, next) => {
    console.log('All');
    next();
});
app.use('/users', userRouter);

app.get('/hel?lo', (req, res) => {
    // res.status(201).send({ success: true});
    throw new Error('ERROR!!!')
});
app.post('/hello', (req, res) => {
    res.send('Hello post');
});
app.use((err: Error, req: Request,res: Response,next: NextFunction) => {
    console.log(err.message);
    res.status(500).send(err.message)
})
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})
