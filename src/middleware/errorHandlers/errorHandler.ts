// src/middleware/errorHandlers/errorHandler.ts

import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import {
	AlreadyExistsError,
	NotFoundError,
} from "../../service/EmployeesServiceMap.ts";
import { extractZodErrorMessage } from "./zodMessageExtractor.ts";

/** Error handling middleware for Express.
 * Catches errors and sends appropriate HTTP responses.
 * @param {Error} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 * @example
 * app.use(errorHandler);
 */
export function errorHandler(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	let statusCode = 500;
	let message = "Internal Server Error";
	if (err instanceof AlreadyExistsError) {
		statusCode = 409;
		message = err.message || "Resource already exists";
	}

	if (err instanceof NotFoundError) {
		statusCode = 404;
		message = err.message || "Not Found";
	}

	if (err instanceof ZodError) {
		statusCode = 400;
		message = extractZodErrorMessage(err) || "Invalid data";
	}

	console.error(message);
	res.statusCode = statusCode;
	res.send(message);
}
