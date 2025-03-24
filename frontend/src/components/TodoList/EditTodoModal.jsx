import React, { useState } from 'react';
import { updateTodo } from '../../services/todoService';

const EditTodoModal = ({ show, handleClose, todo, setSavedTodos }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Title and Description are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const updatedTodo = await updateTodo(todo.id, title, description);
      setSavedTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === todo.id ? updatedTodo : t))
      );
      window.location = "/dashboard";
      handleClose(); // Close modal after updating
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-content">
        <h2>Edit Todo</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
          <button type="button" onClick={handleClose} className="cancel-btn">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTodoModal;
