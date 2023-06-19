import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addTask, deleteTask, editTask, completeTask } from './action';

const TodoList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const task = {
        id: Date.now(),
        name: newTask,
        completed: false,
      };

      // Save the task to the JSON server
      axios.post('http://localhost:3001/tasks', task)
        .then((response) => {
          dispatch(addTask(response.data));
        })
        .catch((error) => {
          console.error('Error adding task:', error);
        });

      setNewTask('');
    }
  };

  const handleDeleteTask = (taskId) => {
    // Delete the task from the JSON server
    axios.delete(`http://localhost:3001/tasks/${taskId}`)
      .then(() => {
        dispatch(deleteTask(taskId));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  const handleEditTask = (taskId, updatedTask) => {
    // Update the task on the JSON server
    axios.put(`http://localhost:3001/tasks/${taskId}`, updatedTask)
      .then((response) => {
        dispatch(editTask(taskId, response.data));
      })
      .catch((error) => {
        console.error('Error editing task:', error);
      });
  };

  const handleCompleteTask = (taskId) => {
    // Update the task completion status on the JSON server
    axios.patch(`http://localhost:3001/tasks/${taskId}`, { completed: true })
      .then(() => {
        dispatch(completeTask(taskId));
      })
      .catch((error) => {
        console.error('Error completing task:', error);
      });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.name}
            </span>
            <button onClick={() => handleCompleteTask(task.id)}>
              Complete
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            <button
              onClick={() => {
                const updatedTask = prompt('Edit task:', task.name);
                if (updatedTask.trim() !== '') {
                  handleEditTask(task.id, { ...task, name: updatedTask });
                }
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
