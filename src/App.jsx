import { v4 as uuidv4 } from 'uuid';
// import { useLocalStorageState } from './hooks/useLocalStorageState';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TimerDisplay } from './components/TimerDisplay';
import { useEffect, useState } from 'react';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const storedValue = localStorage.getItem('tasks');
    return storedValue ? JSON.parse(storedValue) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (title) => {
    setTasks((prev) => [...prev, { id: uuidv4(), title, completed: false }]);
  };

  const handleToggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <>
      <h1>Pomodoro Todo</h1>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="mb-8">
            {isOpen ? (
              <TaskForm onSubmit={handleAddTask} onToggle={handleToggle} />
            ) : (
              <button onClick={handleToggle}>+ Add Task</button>
            )}
            <TaskList tasks={tasks} onDelete={handleDeleteTask} />
          </div>
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <TimerDisplay />
          </div>
        </div>
      </div>
    </>
  );
}
