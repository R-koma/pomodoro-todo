import PropTypes from 'prop-types';

export const TaskList = ({ tasks, onDelete }) => {
  return (
    <>
      <h1>TASKS</h1>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between rounded-lg bg-white p-3 shadow"
          >
            <div className="flex items-center gap-2">{task.title}</div>
            <button onClick={() => onDelete(task.id)}>削除</button>
          </li>
        ))}
      </ul>
    </>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
