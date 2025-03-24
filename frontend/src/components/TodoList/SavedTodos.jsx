import React, { useState } from 'react';
import { removeTodo } from '../../services/todoService';
import EditTodoModal from './EditTodoModal';

const SavedTodos = ({ todos, setSavedTodos, loading }) => {
  const [editingTodo, setEditingTodo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = (todo) => {
    setEditingTodo(todo);
    setShowModal(true);
  };

  const handleDeleteTodo = async (id, e) => {
    e.preventDefault();
    try {
      await removeTodo(id);
      setSavedTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  };

  if (loading) {
    return <div className="saved-todos"><p>Loading saved todos...</p></div>;
  }

  return (
    <div className="saved-todos">
      <h2>Your Todos</h2>
      {todos.length === 0 ? (
        <p>No saved todos yet. Add a todo!</p>
      ) : (
        <div className="todos-container"> {/* Scrollable section */}
          <ul className="todos-list">
            {todos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <div>{todo.created_at}</div>
                <button className="edit-btn" onClick={() => handleEditClick(todo)}>✎ Edit</button>
                <button className="delete-btn" onClick={(e) => handleDeleteTodo(todo.id, e)}>X</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Edit Modal */}
      {showModal && (
        <EditTodoModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          todo={editingTodo}
          setSavedTodos={setSavedTodos}
        />
      )}
    </div>
  );
};

export default SavedTodos;
