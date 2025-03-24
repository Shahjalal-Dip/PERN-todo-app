import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import SavedTodos from './TodoList/SavedTodos';
import AddTodo from './TodoList/AddTodo';
import { getSavedTodos } from '../services/todoService';

const Dashboard = () => {
  const { user } = useAuth();
  const [savedTodos, setSavedTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedTodos = useCallback(async () => {
    try {
      const todos = await getSavedTodos();
      setSavedTodos(todos);
    } catch (error) {
      console.error('Error fetching saved todos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSavedTodos();
  }, [fetchSavedTodos]);

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.username}!</h1>
      <div className="dashboard-content">
        <AddTodo setSavedTodos={setSavedTodos} />
        <SavedTodos todos={savedTodos} setSavedTodos={setSavedTodos} loading={loading} />
      </div>
    </div>
  );
};

export default Dashboard;
