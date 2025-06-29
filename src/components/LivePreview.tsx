import { Code, Download, Eye } from 'lucide-react';

import React from 'react';
import { useEditorStore } from '../store/editorStore';

export const LivePreview: React.FC = () => {
  const { elements } = useEditorStore();

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

    const htmlElements = elements.map(renderElement).join('\n');
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Preview</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f9fafb;
        }
        .preview-container {
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
    <div class="preview-container">
        ${htmlElements}
    </div>
</body>
</html>`;
  };

  const downloadHTML = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'html-preview.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyHTML = () => {
    const html = generateHTML();
    navigator.clipboard.writeText(html).then(() => {
      // You could add a toast notification here
      console.log('HTML copied to clipboard');
    });
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={copyHTML}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Copy HTML"
            >
              <Code size={16} />
            </button>
            <button
              onClick={downloadHTML}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Download HTML"
            >
              <Download size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto">
        {elements.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
            <Eye className="w-12 h-12 mb-4 text-gray-300" />
            <p className="text-center">Add elements to see the preview</p>
          </div>
        ) : (
          <div className="p-4">
            <div 
              className="bg-white border border-gray-200 rounded-lg p-4 min-h-[400px]"
              style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                lineHeight: '1.6'
              }}
            >
              {elements.map((element) => {
                const elementStyle = {
                  ...element.styles,
                  position: 'relative' as const,
                };

                const elementProps: any = {
                  style: elementStyle,
                  ...element.attributes
                };

                // Remove content for self-closing tags
                if (['img', 'br', 'hr'].includes(element.type)) {
                  elementProps.children = null;
                }

                const elementContent = element.content || '';

                return React.createElement(
                  element.type,
                  elementProps,
                  elementContent
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500 text-center">
          {elements.length} element{elements.length !== 1 ? 's' : ''} in preview
        </div>
      </div>
    </div>
  );
}; 