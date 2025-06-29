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
}

const supportedElements = [
  'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'thead', 'tbody',
  'strong', 'em', 'b', 'i', 'u', 'br', 'hr'
];

export const useEditorStore = create<EditorState>((set, get) => ({
  elements: [],
  selectedElementId: null,
  hoveredElementId: null,
  nextId: 1,

  addElement: (type: string, parentId?: string) => {
    if (!supportedElements.includes(type)) return;
    
    const newElement: HTMLElement = {
      id: `element-${get().nextId}`,
      type,
      content: type === 'img' ? '' : 'New Element',
      attributes: {},
      styles: {
        padding: '8px',
        margin: '4px',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        minHeight: '20px',
        display: 'block'
      },
      children: [],
      parentId
    };

    // Add default attributes for specific elements
    if (type === 'img') {
      newElement.attributes.src = 'https://via.placeholder.com/150x100';
      newElement.attributes.alt = 'Image';
      newElement.styles.width = '150px';
      newElement.styles.height = '100px';
    }

    if (type === 'h1' || type === 'h2' || type === 'h3' || type === 'h4' || type === 'h5' || type === 'h6') {
      newElement.styles.fontWeight = 'bold';
      newElement.styles.margin = '8px 0';
    }

    set((state) => ({
      elements: [...state.elements, newElement],
      nextId: state.nextId + 1,
      selectedElementId: newElement.id
    }));
  },

  updateElement: (id: string, updates: Partial<HTMLElement>) => {
    set((state) => ({
      elements: state.elements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      )
    }));
  },

  deleteElement: (id: string) => {
    set((state) => ({
      elements: state.elements.filter(el => el.id !== id),
      selectedElementId: state.selectedElementId === id ? null : state.selectedElementId
    }));
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
    set((state) => ({
      elements: state.elements.map(el => 
        el.id === id ? { ...el, parentId: newParentId } : el
      )
    }));
  }
})); 