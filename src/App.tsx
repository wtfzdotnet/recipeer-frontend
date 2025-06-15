import { useState } from 'react'
import { Button } from '@/components/atoms'
import { Button as ShadcnButton } from '@/components/ui/button'
import { ThemeToggle } from '@/components/molecules'
import { NutritionFacts } from '@/components/organisms'
import './App.css'

// Sample nutrition data for demonstration
const sampleNutrition = {
  calories: 350,
  totalFat: 12,
  saturatedFat: 3,
  transFat: 0,
  cholesterol: 25,
  sodium: 480,
  totalCarbohydrates: 45,
  dietaryFiber: 8,
  totalSugars: 10,
  addedSugars: 5,
  protein: 18,
  vitaminD: 2.5,
  calcium: 200,
  iron: 4,
  potassium: 650,
};

const sampleAllergens = {
  contains: ['Milk', 'Eggs', 'Wheat'],
  mayContain: ['Tree nuts', 'Soy'],
  freeFrom: ['Peanuts', 'Fish', 'Shellfish'],
};

function App() {
  const [showDialogTest, setShowDialogTest] = useState(false);

  if (showDialogTest) {
    return (
      <>
        <div className="fixed top-4 right-4 z-40">
          <ThemeToggle />
        </div>
        <div className="fixed top-4 left-4 z-40">
          <Button variant="outline" onClick={() => setShowDialogTest(false)}>
            ← Back to Home
          </Button>
        </div>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Dialog Tests Removed</h1>
            <p className="text-muted-foreground">
              All dialog verification components have been removed. Please use Storybook to test dialog components.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Theme Toggle in top-right corner */}
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Test Dialog button */}
      <div className="fixed top-4 left-4">
        <Button variant="outline" onClick={() => setShowDialogTest(true)}>
          Test Dialogs →
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-4xl font-bold text-foreground mb-8">Frontend Recipeer - Orange Theme & Nutrition Demo</h1>
      
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Button Testing Section */}
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
          </div>
        </div>

        {/* Nutrition Facts Demo Section */}
        <div className="card bg-card p-8 rounded-lg shadow-lg space-y-4 border">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground">Nutrition Facts Component</h3>
            <p className="text-sm text-muted-foreground">
              FDA-compliant nutrition label with daily values, dietary compliance badges, and allergen warnings.
            </p>
            
            <div className="flex justify-center">
              <NutritionFacts 
                nutrition={sampleNutrition} 
                servings={4}
                showDailyValues={true}
                showAllergens={true}
                allergens={sampleAllergens}
              />
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
    </div>
  )
}

export default App
