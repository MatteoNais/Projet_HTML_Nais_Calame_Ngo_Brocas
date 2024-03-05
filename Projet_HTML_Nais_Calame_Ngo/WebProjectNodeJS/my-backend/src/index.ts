import express from 'express';
import authRouter from "./routes/authRouter";
import configDB from './connections/configDB';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorMiddleware";
import { authenticate } from "./middleware/authMiddleware";
import userRouter from "./routes/userRouter";
import ligueRouter from "./routes/ligueRouter";
import playerRouter from "./routes/playerRouter";
import teamRouter from "./routes/teamRouter";
import equipeRouter from "./routes/equipeRouter";
import draftRouter from "./routes/draftRouter";
import matchRouter from "./routes/matchRouter";
import helmet from "helmet";
import Equipe from './models/Equipe';

dotenv.config();

export interface UserBasicInfo {
    _id: string;
    username: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserBasicInfo | null;
        }
    }
}

const app = express();
const port = process.env.PORT || 8000;
app.use(helmet());

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // To recognize the req obj as strings or arrays. extended true to handle nested objects also


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.use(authRouter);
app.use("/users", authenticate, userRouter);
app.use("/ligues", authenticate, ligueRouter);
app.use("/playersNBA", playerRouter);
app.use("/teamsNBA", teamRouter);
app.use("/equipe", equipeRouter);
app.use("/draft", draftRouter);
app.use("/match",matchRouter); // Nam router for match
app.use(errorHandler);

configDB.connectUserDB();
