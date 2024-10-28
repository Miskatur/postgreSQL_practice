import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { pool } from "./db";

const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data structure to mimic a database
let items: { id: number; name: string }[] = [];

// Read - Get all books
app.get("/books", async (req: Request, res: Response) => {
  try {
    const books = await pool.query("SELECT * FROM book");
    res.status(200).json({
      message: `Book data found successfully`,
      data: books.rows,
    });
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
});

app.get("/books/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const book = await pool.query("SELECT * FROM book WHERE id = $1", [id]);
    res.status(200).json({
      message: `A Book data found successfully`,
      data: book.rows,
    });
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
});
// Create - Add a new book
app.post("/book", async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const id = uuidv4();
    //inserting book data
    const newBook = await pool.query(
      "INSERT INTO book(id, name, description) VALUES ($1, $2, $3) RETURNING *",
      [id, name, description]
    );
    res.status(201).json({
      message: `A book data created successfully`,
      data: newBook.rows,
    });
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
});

// Update - Update an existing book
app.patch("/books/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    const updatedData = await pool.query(
      "UPDATE book SET name=$1, description=$2 WHERE id= $3 RETURNING *",
      [name, description, id]
    );
    res.status(200).json({
      message: `A Book data updated successfully`,
      data: updatedData.rows,
    });
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
});

// Delete - Delete an book
app.delete("/books/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM book WHERE id = $1", [id]);
    res.status(200).json({
      message: `A Book data was deleted`,
    });
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
});
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Node Express!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
