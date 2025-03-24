import React, { useState } from 'react';
import { saveTodo } from '../../services/todoService';

const AddTodo = ({ setSavedTodos }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Both title and description are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const newTodo = await saveTodo(title, description);
      setSavedTodos((prevTodos) => [...prevTodos, newTodo]); // Add new todo to list
      setTitle('');
      setDescription('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-todo-container">
      <h2>Add New Todo</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="add-todo-form">
        <input
          type="text"
          placeholder="Enter todo title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <textarea
          placeholder="Enter todo description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
