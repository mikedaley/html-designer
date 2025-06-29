import { Canvas } from './components/Canvas';
import { ComponentPanel } from './components/ComponentPanel';
import { LivePreview } from './components/LivePreview';
import { PropertyPanel } from './components/PropertyPanel';
import React from 'react';
import { Toolbar } from './components/Toolbar';

function App() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Toolbar */}
      <Toolbar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Components */}
        <ComponentPanel />
        
        {/* Center - Canvas */}
        <Canvas />
        
        {/* Right Panel - Properties */}
        <PropertyPanel />
        
        {/* Far Right - Live Preview */}
        <LivePreview />
      </div>
    </div>
  );
}

export default App; 