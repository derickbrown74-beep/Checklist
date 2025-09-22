import { useState } from 'react';
import { StyleSettings, Task } from '../types';

interface TaskChecklistProps {
  styles: StyleSettings;
  tasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
}

export default function TaskChecklist({ styles, tasks, onTasksChange }: TaskChecklistProps) {
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      onTasksChange([
        ...tasks,
        {
          id: Date.now(),
          text: newTask.trim(),
          completed: false
        }
      ]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    onTasksChange(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    onTasksChange(tasks.filter(task => task.id !== id));
  };

  const clearAllTasks = () => {
    onTasksChange([]);
  };

  return (
    <div 
      style={{ backgroundColor: styles.mainBgColor }}
      className="w-full p-6 rounded-lg shadow-xl bg-white/95 backdrop-blur-md dark:bg-gray-800/95"
    >
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Task Checklist</h1>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          style={{ 
            color: styles.inputTextColor,
            backgroundColor: styles.inputBgColor,
            fontFamily: styles.inputFontFamily,
            fontSize: styles.inputFontSize
          }}
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Add
        </button>
        <button
          onClick={clearAllTasks}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
        >
          Clear All
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map(task => (
          <li
            key={task.id}
            style={{ backgroundColor: styles.listBgColor }}
            className="flex items-center justify-between p-3 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-4 h-4 text-blue-500"
              />
              <span 
                className={task.completed ? 'line-through' : ''}
                style={{ 
                  color: styles.listTextColor,
                  fontFamily: styles.listFontFamily,
                  fontSize: styles.listFontSize
                }}
              >
                {task.text}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}