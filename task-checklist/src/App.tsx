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
  const [styles, setStyles] = useState<StyleSettings>(() => {
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
    <div 
      className="min-h-screen min-w-full fixed inset-0 overflow-auto"
      style={{
        backgroundImage: 'url("/Checklist/Market_for_script.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-lg mx-auto px-4 py-8 relative">
        <div className="sticky top-0 z-10 flex justify-end items-center gap-2 mb-4 py-2">
          <button
            onClick={() => setShowEditor(!showEditor)}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none transform hover:scale-105 transition-transform"
            title="Customize Appearance"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
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
            setStyles(newStyles);
          }} />}
          <TaskChecklist styles={styles} />
        </div>
      </div>
    </div>
  );
}