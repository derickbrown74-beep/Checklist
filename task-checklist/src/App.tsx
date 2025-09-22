import { useEffect, useState } from 'react';
import TaskChecklist from './components/TaskChecklist';
import StyleEditor from './components/StyleEditor';
import './App.css';

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

export default function App() {
  const [showEditor, setShowEditor] = useState(false);
  const [isDark, setIsDark] = useState(() => 
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-lg mx-auto px-4 relative">
        <div className="sticky top-0 z-10 flex justify-end items-center gap-2 mb-4 py-2">
          <button
            onClick={() => setShowEditor(!showEditor)}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none transform hover:scale-105 transition-transform"
            title="Customize Appearance"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 9.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z M10 2c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
            </svg>
          </button>
          <button
            onClick={toggleDarkMode}
            className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none transform hover:scale-105 transition-transform"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {showEditor && <StyleEditor onStyleChange={(newStyles: StyleSettings) => {
            console.log('Styles updated:', newStyles);
          }} />}
          <TaskChecklist />
        </div>
      </div>
    </div>
  );
}