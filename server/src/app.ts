import "reflect-metadata";
import "dotenv/config";

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import AppError from "./errors/AppError";
import router from "./routes";

const api = express();
const port = process.env.API_PORT || 3001;

api.use(cors());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.use(router);

api.use(
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

api.listen(port, () => console.log(`🚀 Listening on port ${port}`));

export default api;
