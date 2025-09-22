import { useState, useEffect } from 'react';

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

const fontFamilies = [
  'Arial, sans-serif',
  'Helvetica, sans-serif',
  'Verdana, sans-serif',
  'Trebuchet MS, sans-serif',
  'Georgia, serif',
  'Times New Roman, serif',
  'Courier New, monospace',
  'system-ui, sans-serif',
];

const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px'];

interface Props {
  onStyleChange: (styles: StyleSettings) => void;
}

export default function StyleEditor({ onStyleChange }: Props) {
  const [settings, setSettings] = useState<StyleSettings>(() => {
    // Load initial settings from localStorage
    const savedSettings = localStorage.getItem('styleSettings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
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
    // Save settings to localStorage and notify parent
    localStorage.setItem('styleSettings', JSON.stringify(settings));
    onStyleChange(settings);
  }, [settings, onStyleChange]);

  const handleChange = (key: keyof StyleSettings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-4">
      <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Style Editor</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Field Styles */}
        <div className="space-y-3 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">Input Field Styling</h3>
          
          <div className="space-y-2">
            <label className="block text-sm text-gray-600 dark:text-gray-300">Text Color</label>
            <input
              type="color"
              value={settings.inputTextColor}
              onChange={(e) => handleChange('inputTextColor', e.target.value)}
              className="w-full h-8 rounded cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-600 dark:text-gray-300">Background Color</label>
            <input
              type="color"
              value={settings.inputBgColor}
              onChange={(e) => handleChange('inputBgColor', e.target.value)}
              className="w-full h-8 rounded cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-600 dark:text-gray-300">Font Family</label>
            <select
              value={settings.inputFontFamily}
              onChange={(e) => handleChange('inputFontFamily', e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            >
              {fontFamilies.map(font => (
                <option key={font} value={font}>{font.split(',')[0]}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-600 dark:text-gray-300">Font Size</label>
            <select
              value={settings.inputFontSize}
              onChange={(e) => handleChange('inputFontSize', e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            >
              {fontSizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        </div>

        {/* List Item Styles */}
        <div className="space-y-3 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">List Items Styling</h3>
          
          <div className="space-y-2">
            <label className="block text-sm text-gray-600 dark:text-gray-300">Text Color</label>
            <input
              type="color"
              value={settings.listTextColor}
              onChange={(e) => handleChange('listTextColor', e.target.value)}
              className="w-full h-8 rounded cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-600 dark:text-gray-300">Background Color</label>
            <input
              type="color"
              value={settings.listBgColor}
              onChange={(e) => handleChange('listBgColor', e.target.value)}
              className="w-full h-8 rounded cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-600 dark:text-gray-300">Font Family</label>
            <select
              value={settings.listFontFamily}
              onChange={(e) => handleChange('listFontFamily', e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            >
              {fontFamilies.map(font => (
                <option key={font} value={font}>{font.split(',')[0]}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-600 dark:text-gray-300">Font Size</label>
            <select
              value={settings.listFontSize}
              onChange={(e) => handleChange('listFontSize', e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            >
              {fontSizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Background Color */}
      <div className="mt-4 space-y-2">
        <h3 className="font-semibold text-gray-700 dark:text-gray-200">Main Background</h3>
        <input
          type="color"
          value={settings.mainBgColor}
          onChange={(e) => handleChange('mainBgColor', e.target.value)}
          className="w-full h-8 rounded cursor-pointer"
        />
      </div>
    </div>
  );
}