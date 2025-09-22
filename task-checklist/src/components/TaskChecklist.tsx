import { useState, useEffect } from 'react'

interface Task {
  id: number
  text: string
  completed: boolean
}

interface StyleSettings {
  inputTextColor: string;
  inputBgColor: string;
  inputFontFamily: string;
  inputFontSize: string;
  listTextColor: string;
  listBgColor: string;
  listFontFamily: string;
  listFontSize: string;
  mainBgColor: string;
}

export default function TaskChecklist() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')
  const [styles, setStyles] = useState<StyleSettings>(() => {
    // Load initial styles from localStorage
    const savedStyles = localStorage.getItem('styleSettings');
    if (savedStyles) {
      return JSON.parse(savedStyles);
    }
    return {
      inputTextColor: '#000000',
      inputBgColor: '#ffffff',
      inputFontFamily: 'system-ui, sans-serif',
      inputFontSize: '16px',
      listTextColor: '#000000',
      listBgColor: '#f3f4f6',
      listFontFamily: 'system-ui, sans-serif',
      listFontSize: '16px',
      mainBgColor: '#ffffff',
    };
  });

  // Load tasks and styles from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }

    // Listen for storage changes to update styles
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'styleSettings' && e.newValue) {
        setStyles(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask.trim(),
          completed: false
        }
      ])
      setNewTask('')
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div style={{ backgroundColor: styles.mainBgColor }} className="w-full p-6 rounded-lg shadow-lg">
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