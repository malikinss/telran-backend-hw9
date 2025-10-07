# Homework 9: Validation & Persistence

## 🧩 Task Definition

**Goal:**  
Implement **data validation** using **Zod** and **data persistence** using a local JSON file.  
This project extends the previous “Employees” back-end with full data validation, file storage, and graceful shutdown handling.

### Requirements:

#### ✅ Validation

-   Implement **Zod validation** (similar to the “calculator” project).
-   Validate all employee fields before processing requests.
-   Handle `ZodError` through a centralized error middleware.

#### 💾 Persistence

-   Employees are **stored in a JSON file**.
-   On app start → employees are **restored synchronously** from file.
-   On app termination (`SIGINT`, `SIGTERM`) → employees are **saved** to file automatically.

---

## 📝 Description

This project is a **TypeScript + Express.js** application that manages employees with full validation and file-based persistence.  
It exposes RESTful endpoints to create, read, update, and delete employees (`CRUD`) and ensures that all data is consistent and permanently stored.

---

## 🎯 Purpose

-   Learn and apply **Zod validation** in middleware.
-   Implement **persistent data storage** with JSON.
-   Practice **error handling**, **clean architecture**, and **TypeScript interfaces**.
-   Demonstrate **graceful shutdown** with data saving on exit signals.

---

## ✨ Features

-   **Zod validation** for all incoming employee data
-   **Persistent file storage** using `fs`
-   **Graceful shutdown** (auto-save employees on `SIGINT` / `SIGTERM`)
-   **Error-handling middleware** for custom and validation errors
-   **REST API** for employees CRUD operations
-   **Optional filtering by department**
-   Fully **typed** with TypeScript

---

## 🔍 How It Works

1. On startup:

    - The app loads existing employees from `data/employees.json`.
    - If the file or directory doesn’t exist, they are created automatically.

2. When an HTTP request comes in:

    - Incoming JSON is validated by **Zod**.
    - If invalid → handled by `errorHandler`.

3. When a new employee is added:

    - If `id` is missing → generated via `uuid`.
    - The employee is stored in an in-memory `Map`.

4. On app shutdown (`Ctrl+C`, Docker stop, etc.):
    - The app listens for `SIGINT` / `SIGTERM`.
    - Before exiting, all employees are saved back to file.

---

## 📜 Output Example

### ✅ Valid Request

**POST /api/employees**

```json
{
	"fullName": "John Doe",
	"avatar": "https://example.com/avatar.jpg",
	"department": "Engineering",
	"birthDate": "1990-05-14",
	"salary": 75000
}
```

**Response 201:**

```json
{
	"id": "1e5d2d3a-8d2e-4c1a-9a31-12ab34cd5678",
	"fullName": "John Doe",
	"avatar": "https://example.com/avatar.jpg",
	"department": "Engineering",
	"birthDate": "1990-05-14",
	"salary": 75000
}
```

### ❌ Invalid Request

**POST /api/employees**

```json
{
	"fullName": "",
	"avatar": "invalid-url"
}
```

**Response 400:**

```
fullName: Full Name is required; avatar: Avatar must be a valid URL
```

---

## 📦 Usage

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run the server

```bash
npm run dev
```

Server will start at:
👉 `http://localhost:3000`

### 3️⃣ Endpoints

| Method | Endpoint                          | Description                 |
| ------ | --------------------------------- | --------------------------- |
| GET    | `/api/employees`                  | Get all employees           |
| GET    | `/api/employees?department=Sales` | Get employees by department |
| POST   | `/api/employees`                  | Create a new employee       |
| PATCH  | `/api/employees/:id`              | Update existing employee    |
| DELETE | `/api/employees/:id`              | Delete employee             |

---

## 🚀 Usage Examples (HTTP)

**Get all employees:**

```bash
curl http://localhost:3000/api/employees
```

**Add employee:**

```bash
curl -X POST http://localhost:3000/api/employees \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Jane Doe","avatar":"https://example.com/jane.jpg","department":"HR","birthDate":"1995-06-10","salary":65000}'
```

**Delete employee:**

```bash
curl -X DELETE http://localhost:3000/api/employees/<id>
```

---

## 🗂 Project Structure

```
src/
├── controller/
│   └── employeeController.ts
├── middleware/
│   ├── errorHandlers/
│   │   ├── errorHandler.ts
│   │   └── zodMessageExtractor.ts
│   └── validations/
│       └── validateEmployee.ts
├── model/
│   └── Employee.ts
├── route/
│   └── employeeRoutes.ts
├── server/
│   └── app.ts
├── service/
│   ├── EmployeesService.ts
│   └── EmployeesServiceMap.ts
├── utils/
│   └── fileStorage.ts
└── index.ts
```

---

## ✅ Dependencies

| Package        | Purpose               |
| -------------- | --------------------- |
| **express**    | Web server            |
| **zod**        | Validation            |
| **morgan**     | HTTP logging          |
| **uuid**       | Generate unique IDs   |
| **dotenv**     | Environment variables |
| **lodash**     | Utility functions     |
| **typescript** | Type safety           |
| **fs / path**  | File persistence      |

---

## 📄 License

MIT License

---

## 🧮 Conclusion

Homework 9 introduces **validation** and **persistence** concepts, integrating them into a real-world **Express + TypeScript** backend.
The system now ensures **data integrity**, **durability**, and **safe shutdown** — key principles of any reliable backend service.

---

Made with ❤️ and `TypeScript` by **Sam-Shepsl Malikin**
