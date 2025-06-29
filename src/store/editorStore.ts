import { create } from 'zustand';

export interface HTMLElement {
  id: string;
  type: string;
  content?: string;
  attributes: Record<string, string>;
  styles: Record<string, string>;
  children: string[];
  parentId?: string;
}

export interface EditorState {
  elements: HTMLElement[];
  selectedElementId: string | null;
  hoveredElementId: string | null;
  nextId: number;
  
  // Actions
  addElement: (type: string, parentId?: string) => void;
  updateElement: (id: string, updates: Partial<HTMLElement>) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  setHoveredElement: (id: string | null) => void;
  updateElementAttribute: (id: string, attribute: string, value: string) => void;
  updateElementStyle: (id: string, property: string, value: string) => void;
  updateElementContent: (id: string, content: string) => void;
  moveElement: (id: string, newParentId?: string) => void;
  getElementById: (id: string) => HTMLElement | undefined;
  getChildren: (parentId: string) => HTMLElement[];
}

const supportedElements = [
  'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'thead', 'tbody',
  'strong', 'em', 'b', 'i', 'u', 'br', 'hr'
];

// Element-specific default content and styles
const getElementDefaults = (type: string): { content: string; styles: Record<string, string>; attributes: Record<string, string> } => {
  const baseStyles = {
    padding: '8px',
    margin: '4px',
    borderRadius: '6px',
    minHeight: '20px',
    display: 'block',
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    color: '#374151',
    fontFamily: 'inherit',
    fontSize: '14px',
    lineHeight: '1.5',
  };

  switch (type) {
    case 'div':
      return {
        content: 'Container',
        styles: {
          ...baseStyles,
          backgroundColor: '#f3f4f6',
          border: '2px dashed #d1d5db',
          minHeight: '60px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        },
        attributes: {}
      };
    
    case 'span':
      return {
        content: 'Inline text',
        styles: {
          ...baseStyles,
          display: 'inline',
          backgroundColor: '#fef3c7',
          border: '1px solid #f59e0b',
          padding: '2px 6px',
          borderRadius: '4px',
        },
        attributes: {}
      };
    
    case 'p':
      return {
        content: 'This is a paragraph with some sample text to demonstrate the styling.',
        styles: {
          ...baseStyles,
          backgroundColor: '#ecfdf5',
          border: '1px solid #10b981',
          padding: '12px',
          margin: '8px 0',
          lineHeight: '1.6',
        },
        attributes: {}
      };
    
    case 'h1':
      return {
        content: 'Main Heading',
        styles: {
          ...baseStyles,
          fontSize: '32px',
          fontWeight: 'bold',
          backgroundColor: '#dbeafe',
          border: '2px solid #3b82f6',
          padding: '16px',
          margin: '16px 0',
          color: '#1e40af',
        },
        attributes: {}
      };
    
    case 'h2':
      return {
        content: 'Section Heading',
        styles: {
          ...baseStyles,
          fontSize: '24px',
          fontWeight: 'bold',
          backgroundColor: '#e0e7ff',
          border: '2px solid #6366f1',
          padding: '12px',
          margin: '12px 0',
          color: '#4338ca',
        },
        attributes: {}
      };
    
    case 'h3':
      return {
        content: 'Subsection Heading',
        styles: {
          ...baseStyles,
          fontSize: '20px',
          fontWeight: 'bold',
          backgroundColor: '#f3e8ff',
          border: '2px solid #8b5cf6',
          padding: '10px',
          margin: '10px 0',
          color: '#6b21a8',
        },
        attributes: {}
      };
    
    case 'img':
      return {
        content: '',
        styles: {
          ...baseStyles,
          width: '200px',
          height: '150px',
          border: '2px solid #f59e0b',
          backgroundColor: '#fef3c7',
          display: 'block',
          objectFit: 'cover',
        },
        attributes: {
          src: 'https://via.placeholder.com/200x150/ffd700/000000?text=Image',
          alt: 'Sample image'
        }
      };
    
    case 'ul':
      return {
        content: '',
        styles: {
          ...baseStyles,
          backgroundColor: '#fef7ff',
          border: '2px solid #c084fc',
          padding: '16px',
          margin: '8px 0',
          listStyleType: 'disc',
          listStylePosition: 'inside',
        },
        attributes: {}
      };
    
    case 'ol':
      return {
        content: '',
        styles: {
          ...baseStyles,
          backgroundColor: '#f0fdf4',
          border: '2px solid #22c55e',
          padding: '16px',
          margin: '8px 0',
          listStyleType: 'decimal',
          listStylePosition: 'inside',
        },
        attributes: {}
      };
    
    case 'li':
      return {
        content: 'List item',
        styles: {
          ...baseStyles,
          backgroundColor: '#fef3c7',
          border: '1px solid #f59e0b',
          padding: '6px 8px',
          margin: '4px 0',
          borderRadius: '4px',
        },
        attributes: {}
      };
    
    case 'table':
      return {
        content: '',
        styles: {
          ...baseStyles,
          backgroundColor: '#f0f9ff',
          border: '2px solid #0ea5e9',
          borderCollapse: 'collapse',
          width: '100%',
          margin: '8px 0',
        },
        attributes: {}
      };
    
    case 'tr':
      return {
        content: '',
        styles: {
          ...baseStyles,
          backgroundColor: '#f8fafc',
          border: '1px solid #cbd5e1',
        },
        attributes: {}
      };
    
    case 'td':
      return {
        content: 'Cell content',
        styles: {
          ...baseStyles,
          backgroundColor: '#fef3c7',
          border: '1px solid #f59e0b',
          padding: '8px',
          textAlign: 'center',
        },
        attributes: {}
      };
    
    case 'strong':
      return {
        content: 'Bold text',
        styles: {
          ...baseStyles,
          fontWeight: 'bold',
          backgroundColor: '#fee2e2',
          border: '1px solid #ef4444',
          padding: '2px 4px',
          borderRadius: '3px',
          display: 'inline',
        },
        attributes: {}
      };
    
    case 'em':
      return {
        content: 'Italic text',
        styles: {
          ...baseStyles,
          fontStyle: 'italic',
          backgroundColor: '#fef3c7',
          border: '1px solid #f59e0b',
          padding: '2px 4px',
          borderRadius: '3px',
          display: 'inline',
        },
        attributes: {}
      };
    
    case 'hr':
      return {
        content: '',
        styles: {
          ...baseStyles,
          border: 'none',
          borderTop: '3px solid #6b7280',
          margin: '16px 0',
          height: '0',
          backgroundColor: 'transparent',
        },
        attributes: {}
      };
    
    default:
      return {
        content: 'New Element',
        styles: baseStyles,
        attributes: {}
      };
  }
};

export const useEditorStore = create<EditorState>((set, get) => ({
  elements: [],
  selectedElementId: null,
  hoveredElementId: null,
  nextId: 1,

  addElement: (type: string, parentId?: string) => {
    if (!supportedElements.includes(type)) return;
    
    const defaults = getElementDefaults(type);
    const newElement: HTMLElement = {
      id: `element-${get().nextId}`,
      type,
      content: defaults.content,
      attributes: defaults.attributes,
      styles: defaults.styles,
      children: [],
      parentId
    };

    set((state) => {
      const newElements = [...state.elements, newElement];
      
      // If adding to a parent, update the parent's children array
      if (parentId) {
        const parentIndex = newElements.findIndex(el => el.id === parentId);
        if (parentIndex !== -1) {
          newElements[parentIndex] = {
            ...newElements[parentIndex],
            children: [...newElements[parentIndex].children, newElement.id]
          };
        }
      }
      
      return {
        elements: newElements,
        nextId: state.nextId + 1,
        selectedElementId: newElement.id
      };
    });
  },

  updateElement: (id: string, updates: Partial<HTMLElement>) => {
    set((state) => ({
      elements: state.elements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      )
    }));
  },

  deleteElement: (id: string) => {
    set((state) => {
      const elementToDelete = state.elements.find(el => el.id === id);
      if (!elementToDelete) return state;

      // Remove from parent's children array
      let newElements = state.elements.map(el => {
        if (el.id === elementToDelete.parentId) {
          return {
            ...el,
            children: el.children.filter(childId => childId !== id)
          };
        }
        return el;
      });

      // Remove the element and all its children recursively
      const removeElementAndChildren = (elementId: string) => {
        const element = newElements.find(el => el.id === elementId);
        if (!element) return;
        
        // Remove all children first
        element.children.forEach(removeElementAndChildren);
        
        // Remove the element itself
        newElements = newElements.filter(el => el.id !== elementId);
      };

      removeElementAndChildren(id);

      return {
        elements: newElements,
        selectedElementId: state.selectedElementId === id ? null : state.selectedElementId
      };
    });
  },

  selectElement: (id: string | null) => {
    set({ selectedElementId: id });
  },

  setHoveredElement: (id: string | null) => {
    set({ hoveredElementId: id });
  },

  updateElementAttribute: (id: string, attribute: string, value: string) => {
    set((state) => ({
      elements: state.elements.map(el => 
        el.id === id 
          ? { ...el, attributes: { ...el.attributes, [attribute]: value } }
          : el
      )
    }));
  },

  updateElementStyle: (id: string, property: string, value: string) => {
    set((state) => ({
      elements: state.elements.map(el => 
        el.id === id 
          ? { ...el, styles: { ...el.styles, [property]: value } }
          : el
      )
    }));
  },

  updateElementContent: (id: string, content: string) => {
    set((state) => ({
      elements: state.elements.map(el => 
        el.id === id ? { ...el, content } : el
      )
    }));
  },

  moveElement: (id: string, newParentId?: string) => {
    set((state) => {
      const element = state.elements.find(el => el.id === id);
      if (!element) return state;

      // Remove from old parent
      let newElements = state.elements.map(el => {
        if (el.id === element.parentId) {
          return {
            ...el,
            children: el.children.filter(childId => childId !== id)
          };
        }
        return el;
      });

      // Add to new parent
      if (newParentId) {
        newElements = newElements.map(el => {
          if (el.id === newParentId) {
            return {
              ...el,
              children: [...el.children, id]
            };
          }
          return el;
        });
      }

      // Update element's parentId
      newElements = newElements.map(el => 
        el.id === id ? { ...el, parentId: newParentId } : el
      );

      return { elements: newElements };
    });
  },

  getElementById: (id: string) => {
    return get().elements.find(el => el.id === id);
  },

  getChildren: (parentId: string) => {
    const parent = get().elements.find(el => el.id === parentId);
    if (!parent) return [];
    return get().elements.filter(el => parent.children.includes(el.id));
  }
})); 