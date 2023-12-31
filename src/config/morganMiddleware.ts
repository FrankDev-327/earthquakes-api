import * as morgan from 'morgan';
import Logger from '../lib/logger';
import { StreamOptions } from "morgan";

const stream: StreamOptions = {
    write: (message) => Logger.http(message.trim()),
};

const skip = () => {
    const env = process.env.NODE_ENV || "dev";
    return env !== "dev";
};

const morganMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    { stream, skip }
);

export default morganMiddleware;