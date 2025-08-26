import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setSelectedTask(null);
  };

  const handleTaskDeleted = (taskId) => {
    axios.delete(`http://localhost:3001/api/tasks/${taskId}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== taskId));
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  const handleTaskCompleted = (task) => {
    axios.put(`http://localhost:3001/api/tasks/${task.id}`, { completed: !task.completed, title: task.title })
      .then(response => {
        setTasks(tasks.map(t => (t.id === response.data.id ? response.data : t)));
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };

  const cancelEdit = () => {
    setSelectedTask(null);
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Task List</h1>
        <TaskForm
          task={selectedTask}
          onTaskAdded={handleTaskAdded}
          onTaskUpdated={handleTaskUpdated}
          onCancelEdit={cancelEdit}
        />
        <ul>
          {tasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <span onClick={() => handleTaskCompleted(task)}>
                {task.title}
              </span>
              <div className="actions">
                <button onClick={() => setSelectedTask(task)}>Edit</button>
                <button className="delete-btn" onClick={() => handleTaskDeleted(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;