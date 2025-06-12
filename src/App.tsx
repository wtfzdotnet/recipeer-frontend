import { useState } from 'react'
import { Button } from './components/Button'
import { Button as ShadcnButton } from './components/ui/button'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="flex gap-8 mb-8">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Frontend Recipeer</h1>
      
      <div className="card bg-white p-8 rounded-lg shadow-lg space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Button Test</h3>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Original HTML Button:</p>
            <button 
              onClick={() => setCount((count) => count + 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              HTML Button - count is {count}
            </button>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Direct shadcn/ui Button:</p>
            <ShadcnButton onClick={() => setCount((count) => count + 1)}>
              Shadcn Button - count is {count}
            </ShadcnButton>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Custom Button (wrapping shadcn):</p>
            <Button onClick={() => setCount((count) => count + 1)}>
              Custom Button - count is {count}
            </Button>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Button Variants:</p>
            <div className="flex gap-2 flex-wrap">
              <ShadcnButton variant="default">Default</ShadcnButton>
              <ShadcnButton variant="destructive">Destructive</ShadcnButton>
              <ShadcnButton variant="outline">Outline</ShadcnButton>
              <ShadcnButton variant="secondary">Secondary</ShadcnButton>
              <ShadcnButton variant="ghost">Ghost</ShadcnButton>
              <ShadcnButton variant="link">Link</ShadcnButton>
            </div>
            
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p className="text-sm text-gray-600 mb-2">Manual Test with explicit classes (these should work):</p>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2">
                Manual Styled Button
              </button>
            </div>
          </div>
        </div>
        
        <p className="mt-4 text-gray-600">
          Edit <code className="bg-gray-100 px-2 py-1 rounded text-sm">src/App.jsx</code> and save to test HMR
        </p>
      </div>
      
      <p className="read-the-docs mt-8 text-gray-500">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
