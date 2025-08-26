import { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ task, onTaskAdded, onTaskUpdated, onCancelEdit }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
    } else {
      setTitle('');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      if (task) {
        axios.put(`http://localhost:3001/api/tasks/${task.id}`, { title, completed: task.completed })
          .then(response => {
            onTaskUpdated(response.data);
          })
          .catch(error => {
            console.error('Error updating task:', error);
          });
      } else {
        axios.post('http://localhost:3001/api/tasks', { title })
          .then(response => {
            onTaskAdded(response.data);
            setTitle('');
          })
          .catch(error => {
            console.error('Error adding task:', error);
          });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
      />
      <button type="submit">{task ? 'Update Task' : 'Add Task'}</button>
      {task && <button type="button" onClick={onCancelEdit}>Cancel</button>}
    </form>
  );
};

export default TaskForm;