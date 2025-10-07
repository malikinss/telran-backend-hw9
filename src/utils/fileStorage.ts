// src/utils/fileStorage.ts

import fs from "fs";
import path from "path";
import { Employee } from "../model/Employee.ts";

const FILE_PATH = path.resolve("data", "employees.json");

/**
 * Ensures that the data directory and file exist.
 * If they do not exist, they are created.
 * @returns {void}
 * @example
 * ensureDataFileExists();
 * // Creates 'data/employees.json' if it does not exist
 */
function ensureDataFileExists() {
	const dir = path.dirname(FILE_PATH);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
	if (!fs.existsSync(FILE_PATH)) {
		fs.writeFileSync(FILE_PATH, JSON.stringify([]));
	}
}

/**
 * Loads employees from the JSON file.
 * @returns {Employee[]} - Array of Employee objects loaded from the file.
 * @example
 * const employees = fileStorage.loadEmployees();
 * console.log(employees);
 * // Output: [{ id: '1', name: 'John Doe', position: 'Developer' }, ...]
 * @throws Will throw an error if the file cannot be read or parsed.
 */
function loadEmployees(): Employee[] {
	try {
		ensureDataFileExists();
		const data = fs.readFileSync(FILE_PATH, "utf-8");
		return JSON.parse(data) as Employee[];
	} catch (error) {
		console.error("Error loading employees from file:", error);
		return [];
	}
}

/**
 * Saves the given array of employees to the JSON file.
 * @param {Employee[]} employees - Array of Employee objects to save.
 * @returns {void}
 * @example
 * const employees = [{ id: '1', name: 'John Doe', position: 'Developer' }];
 * fileStorage.saveEmployees(employees);
 */
function saveEmployees(employees: Employee[]): void {
	try {
		ensureDataFileExists();
		fs.writeFileSync(
			FILE_PATH,
			JSON.stringify(employees, null, 2),
			"utf-8"
		);
	} catch (error) {
		console.error("Error saving employees to file:", error);
	}
}

// Exported object with load and save methods
export const fileStorage = {
	loadEmployees,
	saveEmployees,
};
