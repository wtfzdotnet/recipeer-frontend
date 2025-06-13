import { Button } from '@/components/Button'
import { Button as ShadcnButton } from '@/components/ui/button'
import { NutritionFacts } from '@/components/NutritionFacts'
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
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Frontend Recipeer - Nutrition Facts Demo</h1>
      
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Button Testing Section */}
        <div className="card bg-white p-8 rounded-lg shadow-lg space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Button Test</h3>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Direct shadcn/ui Button:</p>
              <ShadcnButton>
                Shadcn Button
              </ShadcnButton>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Custom Button (wrapping shadcn):</p>
              <Button>
                Custom Button
              </Button>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Button Variants (Shadcn):</p>
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
              <p className="text-sm text-gray-600">Button Variants (Custom):</p>
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
        <div className="card bg-white p-8 rounded-lg shadow-lg space-y-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Nutrition Facts Component</h3>
            <p className="text-sm text-gray-600">
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
        </div>
      </div>
    </div>
  )
}

export default App
