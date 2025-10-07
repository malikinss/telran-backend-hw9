// src/middleware/validations/validateEmployee.ts

import z from "zod";
import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

/** Zod schema for validating employee data. */
const employeeSchema = z.object({
	id: z.uuid().optional(),
	fullName: z.string().min(2, "Full Name is required"),
	avatar: z.url("Avatar must be a valid URL"),
	department: z.string().min(2, "Department is required"),
	birthDate: z
		.string()
		.regex(
			/^\d{4}-\d{2}-\d{2}$/,
			"Birth Date must be in YYYY-MM-DD format"
		),
	salary: z.number().min(0, "Salary must be a positive number"),
});

/** Middleware to validate employee data in the request body.
 * Uses Zod schema to ensure data integrity.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 * @throws {ZodError} Throws ZodError if validation fails.
 * @example
 * app.post("/api/employees", validateEmployee, createEmployee);
 */
export function validateEmployee(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const result = employeeSchema.safeParse(req.body);
	if (!result.success) {
		throw new ZodError(result.error.issues);
	}
	next();
}
