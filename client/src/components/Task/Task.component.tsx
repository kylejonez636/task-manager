import { useState, type SetStateAction } from 'react';
import type Task from '../../models/Task';
import type ApiService from '../../services/ApiService';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function TaskComponent({ api, task, onLoadTasks, onHandleInput }: { api: ApiService, task: Task, onLoadTasks: () => void, onHandleInput: (value: string, setInput: React.Dispatch<SetStateAction<string>>) => void }) {
  const [text, setText] = useState(task.text);
  const [completed, setCompleted] = useState(task.completed);

  function updateTask() {
    const updatedTask: Task = {
      id: task.id,
      text,
      completed,
    };
    api.updateTask(updatedTask).then(() => onLoadTasks());
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
        onChange={e => onHandleInput(e.target.value, setText)}
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
