import { useState } from 'react';
import PropTypes from 'prop-types';

export const TaskForm = ({ onSubmit, onToggle }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim()) {
      onSubmit(title);
      setTitle('');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="新しいタスクを入力..."
          className="flex-1 rounded-lg border px-4 py-2 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
        >
          追加
        </button>
      </form>
      <button
        onClick={onToggle}
        className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 focus:outline-none"
      >
        閉じる
      </button>
    </>
  );
};

TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};
