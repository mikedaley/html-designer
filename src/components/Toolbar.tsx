import {
  Download,
  Grid3X3,
  Layers,
  RotateCcw,
  RotateCw,
  Trash2
} from 'lucide-react';

import React from 'react';
import { useEditorStore } from '../store/editorStore';

export const Toolbar: React.FC = () => {
  const { elements, deleteElement } = useEditorStore();

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all elements?')) {
      elements.forEach(element => deleteElement(element.id));
    }
  };

  const handleUndo = () => {
    // TODO: Implement undo functionality
    console.log('Undo clicked');
  };

  const handleRedo = () => {
    // TODO: Implement redo functionality
    console.log('Redo clicked');
  };

  const handleExport = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'html-design.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateHTML = (): string => {
    const renderElement = (element: any): string => {
      const attributes = Object.entries(element.attributes)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
      
      const styles = Object.entries(element.styles)
        .map(([key, value]) => `${key}: ${value}`)
        .join('; ');
      
      const styleAttr = styles ? ` style="${styles}"` : '';
      const attrString = attributes ? ` ${attributes}` : '';
      
      if (['img', 'br', 'hr'].includes(element.type)) {
        return `<${element.type}${attrString}${styleAttr} />`;
      }
      
      const content = element.content || '';
      return `<${element.type}${attrString}${styleAttr}>${content}</${element.type}>`;
    };

    const htmlElements = elements.map(renderElement).join('\n    ');
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Design</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f9fafb;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        ${htmlElements}
    </div>
</body>
</html>`;
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      {/* Left side - Logo and title */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Grid3X3 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">HTML Designer</h1>
        </div>
        
        <div className="h-6 w-px bg-gray-300"></div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Layers className="w-4 h-4" />
          <span>{elements.length} elements</span>
        </div>
      </div>

      {/* Center - Main actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleUndo}
          disabled={true} // TODO: Implement undo state
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Undo"
        >
          <RotateCcw size={18} />
        </button>
        
        <button
          onClick={handleRedo}
          disabled={true} // TODO: Implement redo state
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Redo"
        >
          <RotateCw size={18} />
        </button>
        
        <div className="h-6 w-px bg-gray-300"></div>
        
        <button
          onClick={handleClearAll}
          disabled={elements.length === 0}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Clear all elements"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Right side - Export and view options */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleExport}
          disabled={elements.length === 0}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Export HTML"
        >
          <Download size={16} />
          <span className="text-sm font-medium">Export</span>
        </button>
      </div>
    </div>
  );
}; 