import { useEffect, useState } from 'react'
import TaskChecklist from './components/TaskChecklist'
import StyleEditor from './components/StyleEditor'
import './App.css'

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

function App() {
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    // Check user's preferred color scheme
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setShowEditor(!showEditor)}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none text-lg font-semibold"
          >
            {showEditor ? '✏️ Hide Style Editor' : '✏️ Customize Appearance'}
          </button>
          
          {showEditor && <StyleEditor onStyleChange={(newStyles: StyleSettings) => {
            // The styles will be automatically saved to localStorage in the StyleEditor component
            // and retrieved by TaskChecklist
            console.log('Styles updated:', newStyles);
          }} />}
          
          <TaskChecklist />
        </div>
      </div>
    </div>
  )
}

export default App
