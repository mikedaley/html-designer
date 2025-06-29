import React from 'react';
import { useEditorStore, HTMLElement } from '../store/editorStore';
import { Trash2, Copy } from 'lucide-react';

export const Canvas: React.FC = () => {
  const {
    elements,
    selectedElementId,
    hoveredElementId,
    selectElement,
    setHoveredElement,
    deleteElement
  } = useEditorStore();

  const handleElementClick = (e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    selectElement(elementId);
  };

  const handleCanvasClick = () => {
    selectElement(null);
  };

  const handleDeleteElement = (e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    deleteElement(elementId);
  };

  const renderElement = (element: HTMLElement): React.ReactElement => {
    const isSelected = selectedElementId === element.id;
    const isHovered = hoveredElementId === element.id;
    
    const elementStyle = {
      ...element.styles,
      position: 'relative' as const,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: isSelected ? '2px solid #3b82f6' : 'none',
      outlineOffset: '2px',
      backgroundColor: isSelected ? '#eff6ff' : isHovered ? '#f8fafc' : 'transparent',
    };

    const elementProps: any = {
      style: elementStyle,
      onClick: (e: React.MouseEvent) => handleElementClick(e, element.id),
      onMouseEnter: () => setHoveredElement(element.id),
      onMouseLeave: () => setHoveredElement(null),
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
  };

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px] p-8">
          <div 
            className="min-h-[500px] relative"
            onClick={handleCanvasClick}
          >
            {elements.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className="text-lg font-medium mb-2">Start Building</p>
                <p className="text-sm text-center max-w-md">
                  Click on components from the left panel to add them to your layout
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {elements.map((element) => {
                  const isSelected = selectedElementId === element.id;
                  const isHovered = hoveredElementId === element.id;
                  
                  return (
                    <div key={element.id} className="relative group">
                      {renderElement(element)}
                      
                      {/* Element Controls */}
                      {(isSelected || isHovered) && (
                        <div className="absolute -top-2 -right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => handleDeleteElement(e, element.id)}
                            className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            title="Delete element"
                          >
                            <Trash2 size={12} />
                          </button>
                          <button
                            className="p-1 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                            title="Duplicate element"
                          >
                            <Copy size={12} />
                          </button>
                        </div>
                      )}
                      
                      {/* Element Label */}
                      {isSelected && (
                        <div className="absolute -top-8 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          {element.type}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 