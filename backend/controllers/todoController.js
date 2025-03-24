const pool = require('../config/db');

// // //get a todo

// app.get("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
//       id
//     ]);

//     res.json(todo.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });  

const getTodos = async (req, res) => {
    try {
      const result = await pool.query(
        'SELECT * FROM todos WHERE user_id = $1',
        [req.user.id]
      );
      
      res.json(result.rows);
    } catch (error) {
      console.error('Get todos error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
const addTodo = async (req, res) => {
    try {
      const { title,description } = req.body;
      
      // Check if Todo already exists for this user
      const todoExists = await pool.query(
        'SELECT * FROM todos WHERE user_id = $1 AND title = $2',
        [req.user.id, title]
      );
      
      if (todoExists.rows.length > 0) {
        return res.status(400).json({ message: 'Todo already saved' });
      }
      
      // Insert new Todo
      const newTodo = await pool.query(
        'INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
        [req.user.id, title,description]
      );
      
      res.status(201).json(newTodo.rows[0]);
    } catch (error) {
      console.error('Save todo error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    await pool.query(
      "UPDATE todos SET title = $1, description = $2 WHERE id = $3",
      [title, description, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
};
  
const deleteTodo = async (req, res) => {
    try {
      const { id } = req.params;
      
      const todo = await pool.query(
        'SELECT * FROM todos WHERE id = $1 AND user_id = $2',
        [id, req.user.id]
      );
      
      if (todo.rows.length === 0) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      
      // Delete Todo
      await pool.query('DELETE FROM todos WHERE id = $1', [id]);
      
      res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
      console.error('Delete todo error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };
