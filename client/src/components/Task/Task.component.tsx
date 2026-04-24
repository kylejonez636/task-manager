import type Task from '../../models/Task';

function TaskComponent({ task }: { task: Task }) {
  return (
    <>
      <div>{task.text}</div>
    </>
  );
}

export default TaskComponent;
