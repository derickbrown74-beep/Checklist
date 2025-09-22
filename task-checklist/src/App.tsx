import { useEffect } from 'react'
import TaskChecklist from './components/TaskChecklist'
import './App.css'

function App() {
  useEffect(() => {
    // Check user's preferred color scheme
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <TaskChecklist />
    </div>
  )
}

export default App
