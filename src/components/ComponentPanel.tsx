import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Image,
  Italic,
  List,
  Minus,
  Square,
  Table,
  Target,
  Type,
  Underline
} from 'lucide-react';

import React from 'react';
import { useEditorStore } from '../store/editorStore';

const elementConfigs = [
  { type: 'div', label: 'Container', icon: Square, color: 'bg-blue-50 text-blue-600' },
  { type: 'span', label: 'Inline', icon: Type, color: 'bg-gray-50 text-gray-600' },
  { type: 'p', label: 'Paragraph', icon: Type, color: 'bg-green-50 text-green-600' },
  { type: 'h1', label: 'Heading 1', icon: Heading1, color: 'bg-purple-50 text-purple-600' },
  { type: 'h2', label: 'Heading 2', icon: Heading2, color: 'bg-purple-50 text-purple-600' },
  { type: 'h3', label: 'Heading 3', icon: Heading3, color: 'bg-purple-50 text-purple-600' },
  { type: 'img', label: 'Image', icon: Image, color: 'bg-orange-50 text-orange-600' },
  { type: 'ul', label: 'List', icon: List, color: 'bg-indigo-50 text-indigo-600' },
  { type: 'table', label: 'Table', icon: Table, color: 'bg-teal-50 text-teal-600' },
  { type: 'strong', label: 'Bold', icon: Bold, color: 'bg-red-50 text-red-600' },
  { type: 'em', label: 'Italic', icon: Italic, color: 'bg-pink-50 text-pink-600' },
  { type: 'u', label: 'Underline', icon: Underline, color: 'bg-yellow-50 text-yellow-600' },
  { type: 'hr', label: 'Divider', icon: Minus, color: 'bg-gray-50 text-gray-600' },
];

export const ComponentPanel: React.FC = () => {
  const { addElement, selectedElementId, getElementById } = useEditorStore();
  const selectedElement = selectedElementId ? getElementById(selectedElementId) : null;

  const handleElementClick = (type: string) => {
    // Add to selected element if one is selected, otherwise add to root
    addElement(type, selectedElementId || undefined);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <h2 className="text-lg font-semibold text-gray-900">Components</h2>
      </div>

      {/* Selected Element Info */}
      {selectedElement && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Selected Element</span>
          </div>
          <div className="text-sm text-blue-700">
            <span className="font-mono bg-white px-2 py-1 rounded border text-xs">
              {selectedElement.type}
            </span>
            {selectedElement.content && (
              <p className="mt-1 text-xs text-blue-600 truncate">
                "{selectedElement.content}"
              </p>
            )}
          </div>
          <p className="text-xs text-blue-600 mt-2">
            New elements will be added inside this element
          </p>
        </div>
      )}
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Layout</h3>
        <div className="grid grid-cols-2 gap-2">
          {elementConfigs.slice(0, 3).map((config) => (
            <ComponentButton key={config.type} config={config} onClick={handleElementClick} />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Typography</h3>
        <div className="grid grid-cols-2 gap-2">
          {elementConfigs.slice(3, 9).map((config) => (
            <ComponentButton key={config.type} config={config} onClick={handleElementClick} />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Media</h3>
        <div className="grid grid-cols-2 gap-2">
          {elementConfigs.slice(9, 10).map((config) => (
            <ComponentButton key={config.type} config={config} onClick={handleElementClick} />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Formatting</h3>
        <div className="grid grid-cols-2 gap-2">
          {elementConfigs.slice(10, 13).map((config) => (
            <ComponentButton key={config.type} config={config} onClick={handleElementClick} />
          ))}
        </div>
      </div>

      {/* Instructions */}
      {!selectedElement && (
        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            Click on an element in the canvas to add new elements inside it
          </p>
        </div>
      )}
    </div>
  );
};

interface ComponentButtonProps {
  config: {
    type: string;
    label: string;
    icon: React.ComponentType<{ size?: number }>;
    color: string;
  };
  onClick: (type: string) => void;
}

const ComponentButton: React.FC<ComponentButtonProps> = ({ config, onClick }) => {
  const Icon = config.icon;
  
  return (
    <button
      onClick={() => onClick(config.type)}
      className={`
        flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200
        hover:border-gray-300 hover:shadow-sm transition-all duration-200
        ${config.color} hover:scale-105 active:scale-95
      `}
    >
      <Icon size={20} />
      <span className="text-xs font-medium">{config.label}</span>
    </button>
  );
}; 