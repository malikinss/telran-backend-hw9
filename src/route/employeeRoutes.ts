// src/route/employeeRoutes.ts

import express from "express";
import {
	getAllEmployees,
	createEmployee,
	updateEmployee,
	deleteEmployee,
} from "../controller/employeeController.ts";
import { validateEmployee } from "../middleware/validations/validateEmployee.ts";

const router = express.Router();

// GET /api/employees - Get all employees
router.get("/", getAllEmployees);

// POST /api/employees - Create a new employee
router.post("/", validateEmployee, createEmployee);

// PATCH /api/employees/:id - Update an existing employee
router.patch("/:id", validateEmployee, updateEmployee);

// DELETE /api/employees/:id - Delete an employee
router.delete("/:id", deleteEmployee);

export default router;
