import { ChevronDown, ChevronRight, Copy, Plus, Trash2 } from 'lucide-react';
import { HTMLElement, useEditorStore } from '../store/editorStore';

import React from 'react';

export const Canvas: React.FC = () => {
  const {
    elements,
    selectedElementId,
    hoveredElementId,
    selectElement,
    setHoveredElement,
    deleteElement,
    addElement,
    getChildren
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

  const handleAddInside = (e: React.MouseEvent, parentId: string) => {
    e.stopPropagation();
    // This will be handled by a context menu or dropdown
    console.log('Add inside:', parentId);
  };

  const renderElement = (element: HTMLElement, depth: number = 0): React.ReactElement => {
    const isSelected = selectedElementId === element.id;
    const isHovered = hoveredElementId === element.id;
    const children = getChildren(element.id);
    const hasChildren = children.length > 0;
    
    const elementStyle = {
      ...element.styles,
      position: 'relative' as const,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: isSelected ? '3px solid #3b82f6' : 'none',
      outlineOffset: '2px',
      backgroundColor: isSelected ? '#eff6ff' : isHovered ? '#f8fafc' : element.styles.backgroundColor,
      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
      boxShadow: isSelected ? '0 4px 12px rgba(59, 130, 246, 0.3)' : isHovered ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
      marginLeft: `${depth * 20}px`,
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

  const renderElementWithControls = (element: HTMLElement, depth: number = 0) => {
    const isSelected = selectedElementId === element.id;
    const isHovered = hoveredElementId === element.id;
    const children = getChildren(element.id);
    const hasChildren = children.length > 0;

    return (
      <div key={element.id} className="relative group">
        <div className="relative">
          {renderElement(element, depth)}
          
          {/* Element Controls */}
          {(isSelected || isHovered) && (
            <div className="absolute -top-2 -right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                onClick={(e) => handleAddInside(e, element.id)}
                className="p-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                title="Add element inside"
              >
                <Plus size={12} />
              </button>
              <button
                onClick={(e) => handleDeleteElement(e, element.id)}
                className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                title="Delete element"
              >
                <Trash2 size={12} />
              </button>
            </div>
          )}
          
          {/* Element Label */}
          {isSelected && (
            <div className="absolute -top-8 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
              <span className="font-mono">{element.type}</span>
              {hasChildren && (
                <span className="text-xs opacity-75">({children.length})</span>
              )}
            </div>
          )}

          {/* Nested Elements */}
          {hasChildren && (
            <div className="mt-2 space-y-1">
              {children.map(child => renderElementWithControls(child, depth + 1))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Get root elements (those without parents)
  const rootElements = elements.filter(element => !element.parentId);

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
                {rootElements.map((element) => renderElementWithControls(element))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 