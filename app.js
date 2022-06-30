import express from "express";
import * as dotenv from "dotenv";
import Joi from "joi";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";

dotenv.config();

// Valisation
const schema = Joi.object({
  id: Joi.number().integer().required(),
  description: Joi.string().required(),
});

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
 
const corsOptions = { credential: true, origin: process.env.URL || "*" };
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(join(__dirname, "public")));
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/users/test", usersRouter);

// app.delete("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const checkTodo = await pool.query(
//       "SELECT * FROM todo WHERE todo_id = $1",
//       [id]
//     );
//     if (checkTodo.rows.length > 0) {
//       await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
//       return res.json({ message: "todo deleted" });
//     }
//     res.status(404).json({ message: "todo not found" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "server error" });
//   }
// });

// app.put("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { description } = req.body;
//     const errorMessage = await doValidation({ id, description });
//     if (errorMessage) {
//       return res.status(400).json({ success: false, message: errorMessage });
//     }
//     const checkTodo = await pool.query(
//       "SELECT * FROM todo WHERE todo_id = $1",
//       [id]
//     );
//     if (checkTodo.rows.length > 0) {
//       const updatedTodo = await pool.query(
//         "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
//         [description, id]
//       );
//       return res.json({ message: "Todo updated", data: updatedTodo.rows[0] });
//     }
//     res.status(404).json({ message: "todo not found" });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.get("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
//       id,
//     ]);
//     res.json({ message: "single todo", data: todo.rows[0] });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.get("/todos", async (req, res) => {
//   // return res.status(200).json({testing_auth: true})
//   try {
//     const { page, size } = req.query;
//     const todos = await pool.query(
//       'SELECT *, count(*) OVER() AS total_count FROM todo ORDER BY "todo"."todo_id" LIMIT $2 OFFSET (($1 - 1) * $2)',
//       [page, size]
//     );
//     res.json({
//       message: "all todos",
//       data: todos.rows,
//       pagination: setPagination(page, size, todos),
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/todos", async (req, res) => {
//   try {
//     const { description } = req.body;
//     try {
//       const schema = Joi.object({ description: Joi.string().required() });
//       await schema.validateAsync({ description });
//     } catch (error) {
//       const message = error.details[0].message;
//       return res.status(400).json({ success: false, message });
//     }
//     const newTodo = await pool.query(
//       "INSERT INTO todo (description) VALUES ($1) RETURNING *",
//       [description]
//     );
//     console.log("the body", description);
//     res.status(201).json({
//       success: true,
//       message: "added successfully",
//       data: newTodo.rows[0],
//     });
//   } catch (error) {
//     console.log("the error", error.message);
//   }
// });

// app.get("/todos-search", async (req, res) => {
//   try {
//     const { page, size, search } = req.query;
//     const todos = await pool.query(
//       `SELECT  *, count(*) OVER() AS total_count FROM todo WHERE description LIKE '%' ||$1|| '%' ORDER BY "todo"."todo_id" LIMIT $3 OFFSET (($2 - 1) * $3)`,
//       [search, page, size]
//     );
//     res.json({
//       message: "searched all todos",
//       data: todos.rows,
//       pagination: setPagination(page, size, todos),
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// const setPagination = (page, size, data) => {
//   return {
//     page: parseInt(page),
//     size: parseInt(size),
//     next:
//       parseInt(size) < parseInt(data.rows[0] && data.rows[0].total_count)
//         ? true
//         : false,
//     previous: parseInt(page) > 1 ? true : false,
//     total: parseInt(data.rows[0] && data.rows[0].total_count),
//   };
// };

// const doValidation = async ({ id, description }) => {
//   try {
//     await schema.validateAsync({ id, description });
//   } catch (error) {
//     const message = error.details[0].message;
//     return message;
//   }
// };

export default app; 

