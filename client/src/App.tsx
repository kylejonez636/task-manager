import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ApiService from './services/ApiService'
import type Task from './models/Task';
import TaskComponent from './components/Task/Task.component';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function App() {
  const api = new ApiService();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);
  
  function loadTasks() {
    api.getTasks().then(data => {
      if (data?.success) setTasks(data.tasks);
    });
  }

  return (
    <>
      <section id="center">
        <div>
          <h1>Task Manager</h1>
          <p>View, edit, and delete your tasks below.</p>
        </div>

        <Form>
          <Form.Group>
            <Form.Label>Create a new task</Form.Label>
            <Form.Control id="addTaskField" type="text" />
          </Form.Group>

          <Button variant="primary">
            <i className="bi bi-plus-circle"></i> Add
          </Button>
        </Form>

        <div>
          {tasks.length ? (
            <>
              {tasks.map(task => <TaskComponent task={task} key={task.id} />)}
            </>
          ) : (
            <>
              <p>No tasks found.</p>
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default App
