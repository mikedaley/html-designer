# HTML Designer

A modern, React-based HTML editor for creating beautiful layouts with a clean, intuitive interface inspired by Lovable.dev.

## Features

### 🎨 Visual Editor
- **Drag & Drop Interface**: Add elements by clicking on components from the panel
- **Real-time Preview**: See changes instantly as you edit
- **Element Selection**: Click on any element to select and edit its properties
- **Visual Feedback**: Hover and selection states with smooth animations

### 📦 Supported Elements
- **Layout**: `div`, `span`, `p`
- **Typography**: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
- **Media**: `img`
- **Lists**: `ul`, `ol`, `li`
- **Tables**: `table`, `tr`, `td`, `th`, `thead`, `tbody`
- **Formatting**: `strong`, `em`, `b`, `i`, `u`, `br`, `hr`

### 🛠️ Property Editor
- **Content Editing**: Modify text content for text-based elements
- **Style Properties**: Width, height, padding, margin, colors, fonts, borders
- **Attributes**: Image source, alt text, and other element-specific attributes
- **Custom CSS**: Direct CSS editing for advanced styling

### 📱 Modern UI/UX
- **Clean Design**: Inspired by Lovable.dev with soft shadows and rounded corners
- **Responsive Layout**: Four-panel design with resizable sections
- **Smooth Animations**: Subtle transitions and hover effects
- **Intuitive Controls**: Clear visual hierarchy and user feedback

### 💾 Export & Share
- **HTML Export**: Download complete HTML files
- **Copy to Clipboard**: Quick HTML copying for sharing
- **Live Preview**: Real-time rendering of your design

## Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first styling
- **Zustand** - Lightweight state management
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd html-designer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Usage

### Adding Elements
1. Click on any component in the left panel
2. The element will be added to the canvas
3. Click on the element to select it and edit properties

### Editing Properties
1. Select an element on the canvas
2. Use the property panel on the right to modify:
   - Content (for text elements)
   - Styles (colors, spacing, typography)
   - Attributes (for images and other elements)

### Exporting
1. Click the "Export" button in the toolbar
2. Choose to download the HTML file or copy to clipboard
3. The exported HTML includes all styles and is ready to use

## Project Structure

```
src/
├── components/
│   ├── Canvas.tsx           # Main editing area
│   ├── ComponentPanel.tsx   # Element library
│   ├── PropertyPanel.tsx    # Property editor
│   ├── LivePreview.tsx      # Real-time preview
│   └── Toolbar.tsx          # Top toolbar
├── store/
│   └── editorStore.ts       # Zustand state management
├── App.tsx                  # Main application
└── index.tsx               # Entry point
```

## Design Philosophy

This HTML Designer follows modern design principles:

- **Simplicity**: Clean, uncluttered interface
- **Efficiency**: Quick access to common actions
- **Feedback**: Clear visual states and animations
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Optimized rendering and state updates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Design inspiration from [Lovable.dev](https://lovable.dev)
- Icons from [Lucide](https://lucide.dev)
- UI components built with [TailwindCSS](https://tailwindcss.com)
