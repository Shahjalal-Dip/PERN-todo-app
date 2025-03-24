// services/locationService.js
const API_URL = 'http://localhost:5000/api';

export const getSavedTodos = async () => {
  try {
    const response = await fetch(`${API_URL}/todos`, {
      credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch todos');
    return data;
  } catch (error) {
    throw error;
  }
};

export const saveTodo = async (title, description) => {
  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }), // Send both title & description
      credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to save todo');
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateTodo = async (todoId, title, description) => {
  try {
    const response = await fetch(`${API_URL}/todos/${todoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
      credentials: 'include',
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update todo');
    return data;
  } catch (error) {
    throw error;
  }
};


export const removeTodo = async (todoId) => {
  try {
    const response = await fetch(`${API_URL}/todos/${todoId}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to remove todo');
    }
  } catch (error) {
    throw error;
  }
};
