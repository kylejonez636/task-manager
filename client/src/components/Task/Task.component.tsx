import { useState } from 'react';
import type Task from '../../models/Task';
import type ApiService from '../../services/ApiService';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function TaskComponent({ api, task, onLoadTasks }: { api: ApiService, task: Task, onLoadTasks: () => void }) {
  const [text, setText] = useState(task.text);
  const [completed, setCompleted] = useState(task.completed);

  function updateTask() {
    console.log('clicked update for', task);
  }

  function deleteTask() {
    api.deleteTask(task.id).then(() => onLoadTasks());
  }

  return (
    <div className="taskItem">
      <Form.Check
        id={`task-completed-${task.id}`}
        checked={completed}
        onChange={() => setCompleted(!completed)}
      />

      <Form.Control
        id={`task-text-${task.id}`}
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <Button variant="success" onClick={updateTask}>
        <i className="bi bi-floppy"></i>
      </Button>

      <Button variant="danger" onClick={deleteTask}>
        <i className="bi bi-trash"></i>
      </Button>
    </div>
  );
}

export default TaskComponent;
