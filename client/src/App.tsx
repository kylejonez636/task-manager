import { useEffect, useState, type SetStateAction } from 'react'
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
  const [taskInput, setTaskInput] = useState('');

  const handleChange = (value: string, setInput: React.Dispatch<SetStateAction<string>>) => {
    if (value.length <= 50) setInput(value);
  };

  useEffect(() => {
    loadTasks();
  }, []);
  
  function loadTasks() {
    api.getTasks().then(data => {
      if (data?.success) setTasks(data.tasks);
    });
  }

  function addTask() {
    if (!taskInput) return;

    api.createTask(taskInput).then(result => {
      if (result?.success) {
        loadTasks();
        setTaskInput('');
      }
    });
  }

  return (
    <>
      <section id="center">
        <div>
          <h1>Task Manager</h1>
          <p>View, edit, and delete your tasks below.</p>
        </div>

        <div className="addTaskSection">
          {tasks.length < 10 ? (
            <>
              <Form.Group>
                <Form.Label>Create a new task</Form.Label>
                <Form.Control
                  id="addTaskField"
                  type="text"
                  value={taskInput}
                  onChange={e => handleChange(e.target.value, setTaskInput)}
                />
              </Form.Group>

              <div className="addTaskButton">
                <Button variant="primary" onClick={addTask} disabled={!taskInput}>
                  <i className="bi bi-plus-circle"></i> Add
                </Button>
              </div>
            </>
          ) : (
            <>
              <p>A maximum of 10 tasks is allowed.</p>
            </>
          )}
        </div>

        <div>
          {tasks.length ? (
            <>
              {tasks.map(task => <TaskComponent api={api} task={task} onLoadTasks={loadTasks} onHandleInput={handleChange} key={task.id} />)}
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
