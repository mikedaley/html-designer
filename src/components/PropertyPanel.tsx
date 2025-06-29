import { Layout, Palette, Settings, Type } from 'lucide-react';

import React from 'react';
import { useEditorStore } from '../store/editorStore';

export const PropertyPanel: React.FC = () => {
  const {
    elements,
    selectedElementId,
    updateElementAttribute,
    updateElementStyle,
    updateElementContent
  } = useEditorStore();

  const selectedElement = elements.find(el => el.id === selectedElementId);

  if (!selectedElement) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
        </div>
        <div className="text-center text-gray-500 py-8">
          <Settings className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Select an element to edit its properties</p>
        </div>
      </div>
    );
  }

  const handleContentChange = (value: string) => {
    updateElementContent(selectedElement.id, value);
  };

  const handleAttributeChange = (attribute: string, value: string) => {
    updateElementAttribute(selectedElement.id, attribute, value);
  };

  const handleStyleChange = (property: string, value: string) => {
    updateElementStyle(selectedElement.id, property, value);
  };

  const commonStyles = [
    { label: 'Width', property: 'width', type: 'text', placeholder: 'e.g., 100px, 50%' },
    { label: 'Height', property: 'height', type: 'text', placeholder: 'e.g., 100px, auto' },
    { label: 'Padding', property: 'padding', type: 'text', placeholder: 'e.g., 8px, 1rem' },
    { label: 'Margin', property: 'margin', type: 'text', placeholder: 'e.g., 4px, 0 auto' },
    { label: 'Background Color', property: 'backgroundColor', type: 'color' },
    { label: 'Color', property: 'color', type: 'color' },
    { label: 'Font Size', property: 'fontSize', type: 'text', placeholder: 'e.g., 16px, 1.2rem' },
    { label: 'Font Weight', property: 'fontWeight', type: 'select', options: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    { label: 'Text Align', property: 'textAlign', type: 'select', options: ['left', 'center', 'right', 'justify'] },
    { label: 'Border', property: 'border', type: 'text', placeholder: 'e.g., 1px solid #ccc' },
    { label: 'Border Radius', property: 'borderRadius', type: 'text', placeholder: 'e.g., 4px, 50%' },
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
      </div>

      {/* Element Info */}
      <div className="mb-6 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Layout className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Element Type</span>
        </div>
        <p className="text-sm text-gray-900 font-mono bg-white px-2 py-1 rounded border">
          {selectedElement.type}
        </p>
      </div>

      {/* Content Section */}
      {!['img', 'br', 'hr'].includes(selectedElement.type) && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Type className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-medium text-gray-700">Content</h3>
          </div>
          <textarea
            value={selectedElement.content || ''}
            onChange={(e) => handleContentChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm resize-none"
            rows={3}
            placeholder="Enter content..."
          />
        </div>
      )}

      {/* Attributes Section */}
      {selectedElement.type === 'img' && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Settings className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-medium text-gray-700">Attributes</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Source URL</label>
              <input
                type="text"
                value={selectedElement.attributes.src || ''}
                onChange={(e) => handleAttributeChange('src', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Alt Text</label>
              <input
                type="text"
                value={selectedElement.attributes.alt || ''}
                onChange={(e) => handleAttributeChange('alt', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                placeholder="Image description"
              />
            </div>
          </div>
        </div>
      )}

      {/* Styles Section */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Palette className="w-4 h-4 text-gray-600" />
          <h3 className="text-sm font-medium text-gray-700">Styles</h3>
        </div>
        <div className="space-y-3">
          {commonStyles.map((style) => (
            <div key={style.property}>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                {style.label}
              </label>
              {style.type === 'select' ? (
                <select
                  value={selectedElement.styles[style.property] || ''}
                  onChange={(e) => handleStyleChange(style.property, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Select...</option>
                  {style.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : style.type === 'color' ? (
                <input
                  type="color"
                  value={selectedElement.styles[style.property] || '#000000'}
                  onChange={(e) => handleStyleChange(style.property, e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md"
                />
              ) : (
                <input
                  type="text"
                  value={selectedElement.styles[style.property] || ''}
                  onChange={(e) => handleStyleChange(style.property, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder={style.placeholder}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Settings className="w-4 h-4 text-gray-600" />
          <h3 className="text-sm font-medium text-gray-700">Custom CSS</h3>
        </div>
        <textarea
          value={Object.entries(selectedElement.styles)
            .map(([key, value]) => `${key}: ${value};`)
            .join('\n')}
          onChange={(e) => {
            const lines = e.target.value.split('\n');
            const newStyles: Record<string, string> = {};
            lines.forEach(line => {
              const [property, value] = line.split(':').map(s => s.trim());
              if (property && value) {
                newStyles[property] = value.replace(';', '');
              }
            });
            Object.entries(newStyles).forEach(([property, value]) => {
              handleStyleChange(property, value);
            });
          }}
          className="w-full p-2 border border-gray-300 rounded-md text-sm font-mono resize-none"
          rows={6}
          placeholder="Enter custom CSS..."
        />
      </div>
    </div>
  );
}; 