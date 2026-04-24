import { useEffect, useState } from 'react'
import './App.css'
import ApiService from './services/ApiService'
import type Task from './models/Task';
import TaskComponent from './components/Task/Task.component';

function App() {
  const api = new ApiService();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, tasks);
  
  function loadTasks() {
    api.getTasks().then(data => {
      console.log(data);
    });
  }

  return (
    <>
      <section id="center">
        <div>
          <h1>Task Manager</h1>
          <p>View, edit, and delete your tasks below.</p>
        </div>
      </section>

      <section id="tasks">
        {tasks.length ? (
          <>
            {tasks.map(task => <TaskComponent task={task} />)}
          </>
        ) : (
          <>
            <p>No tasks found.</p>
          </>
        )}
      </section>
    </>
  )
}

export default App
