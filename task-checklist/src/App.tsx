import { useState } from 'react';
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