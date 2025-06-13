import { Button } from '@/components/Button'
import { Button as ShadcnButton } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      {/* Theme Toggle in top-right corner */}
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>

      <h1 className="text-4xl font-bold text-foreground mb-8">Frontend Recipeer - Orange Theme Demo</h1>
      
      <div className="card bg-card p-8 rounded-lg shadow-lg space-y-4 border">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-card-foreground">Button Test with Orange Theme</h3>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Direct shadcn/ui Button:</p>
            <ShadcnButton>
              Shadcn Button
            </ShadcnButton>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Custom Button (wrapping shadcn):</p>
            <Button>
              Custom Button
            </Button>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Button Variants (Shadcn):</p>
            <div className="flex gap-2 flex-wrap">
              <ShadcnButton variant="default">Default</ShadcnButton>
              <ShadcnButton variant="destructive">Destructive</ShadcnButton>
              <ShadcnButton variant="outline">Outline</ShadcnButton>
              <ShadcnButton variant="secondary">Secondary</ShadcnButton>
              <ShadcnButton variant="ghost">Ghost</ShadcnButton>
              <ShadcnButton variant="link">Link</ShadcnButton>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Button Variants (Custom):</p>
            <div className="flex gap-2 flex-wrap">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <h4 className="font-semibold text-secondary-foreground mb-2">🍳 Recipe-Themed Colors</h4>
            <p className="text-secondary-foreground text-sm">
              This warm orange color palette is inspired by cooking and food preparation. 
              The colors work well for recipe cards, ingredients lists, and cooking instructions.
              Try toggling between light and dark modes using the button in the top-right corner!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
