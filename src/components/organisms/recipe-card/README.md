# RecipeCard Component

A comprehensive React component for displaying recipe information with support for multiple variants, interactive elements, and cultural sensitivity. This organism-level component integrates all recipe-specific components for browsing and discovery.

## Features

- **Three Layout Variants**: Compact (grid), Standard (default), Featured (hero)
- **Complete Recipe Integration**: Title, description, author, ratings, timing, difficulty, tags
- **Interactive Elements**: Save to collections, share, print, add to meal plan
- **Hero Image Display**: Responsive AspectRatio with gradient overlays
- **Author Information**: Avatar, name, verification status
- **Metadata Display**: Cook time, prep time, servings, difficulty level
- **Collection Management**: Integration with RecipeCollectionSaver
- **Rating System**: Star ratings with review counts
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **RTL Support**: Complete right-to-left language compatibility
- **Responsive Design**: Mobile-optimized touch interactions
- **i18n Ready**: useTranslation hooks for internationalization
- **Design Token Compliant**: Uses only approved design system colors and spacing

## Basic Usage

```tsx
import { RecipeCard } from '@/components/organisms/recipe-card';

const recipe = {
  id: 'recipe-1',
  title: 'Grandma\'s Apple Pie',
  description: 'A delicious traditional apple pie...',
  image: 'https://example.com/apple-pie.jpg',
  author: {
    id: 'author-1',
    name: 'Sarah Johnson',
    avatar: 'https://example.com/avatar.jpg'
  },
  ratings: { average: 4.8, count: 127 },
  timing: { prepTime: 30, cookTime: 45, totalTime: 75 },
  difficulty: 'intermediate',
  servings: 8,
  tags: ['dessert', 'traditional'],
  nutrition: { calories: 320 }
};

<RecipeCard
  recipe={recipe}
  variant="standard"
  showSaveButton={true}
  onSave={(id) => handleSave(id)}
  onShare={(id) => handleShare(id)}
  onClick={(id) => navigateToRecipe(id)}
/>
```

## Variants

### Standard Variant (Default)
```tsx
<RecipeCard recipe={recipe} variant="standard" />
```
- Complete information display
- Author details with avatar
- Full metadata and tags
- Quick action buttons
- Ideal for homepage browsing

### Compact Variant
```tsx
<RecipeCard recipe={recipe} variant="compact" />
```
- Overlay design for space efficiency
- Essential information only
- Perfect for grid layouts and search results
- Optimized for mobile browsing

### Featured Variant
```tsx
<RecipeCard recipe={recipe} variant="featured" />
```
- Hero placement with enhanced content
- Large format with expanded information
- Ideal for homepage banners and promotions
- Maximum visual impact

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `recipe` | `Recipe` | Required | Recipe data object |
| `variant` | `'compact' \| 'standard' \| 'featured'` | `'standard'` | Visual variant |
| `showSaveButton` | `boolean` | `true` | Show collection save functionality |
| `collections` | `Array<{id: string, name: string}>` | `[]` | Available collections |
| `onSave` | `(recipeId: string) => void` | - | Save button handler |
| `onShare` | `(recipeId: string) => void` | - | Share button handler |
| `onPrint` | `(recipeId: string) => void` | - | Print button handler |
| `onAddToMealPlan` | `(recipeId: string) => void` | - | Meal plan handler |
| `onClick` | `(recipeId: string) => void` | - | Card click handler |
| `className` | `string` | - | Custom CSS classes |

## Recipe Data Interface

```tsx
interface Recipe {
  id: string;
  title: string;
  description?: string;
  image: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    isVerified?: boolean;
  };
  ratings: {
    average: number;
    count: number;
  };
  timing: {
    prepTime: number;
    cookTime: number;
    totalTime: number;
  };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  servings: number;
  tags: string[];
  nutrition: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  savedCollections?: string[];
}
```

## Integration Examples

### Grid Layout (Search Results)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {recipes.map(recipe => (
    <RecipeCard
      key={recipe.id}
      recipe={recipe}
      variant="compact"
      onSave={handleSave}
      onClick={handleView}
    />
  ))}
</div>
```

### Homepage Featured Recipe
```tsx
<RecipeCard
  recipe={featuredRecipe}
  variant="featured"
  showSaveButton={true}
  onSave={handleSave}
  onShare={handleShare}
  onAddToMealPlan={handleMealPlan}
  className="max-w-2xl mx-auto"
/>
```

### Recipe Collection
```tsx
<div className="space-y-4">
  {collection.recipes.map(recipe => (
    <RecipeCard
      key={recipe.id}
      recipe={recipe}
      variant="standard"
      collections={userCollections}
      onSave={handleSave}
      onShare={handleShare}
      onPrint={handlePrint}
    />
  ))}
</div>
```

## Accessibility

- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Focus Management**: Clear focus indicators and logical tab order
- **Alt Text**: Descriptive image alt text for recipe photos
- **Color Contrast**: WCAG 2.1 AA compliant color combinations

## RTL Language Support

- **Directional Layout**: Automatic layout reversal for RTL languages
- **Spacing**: `rtl:space-x-reverse` for proper spacing direction
- **Positioning**: `rtl:left-auto rtl:right-*` for absolute positioning
- **Icon Orientation**: Icons automatically flip for RTL contexts

## Internationalization

The component uses `react-i18next` for text internationalization:

```tsx
const { t } = useTranslation('recipe');

// Usage examples:
t('timing.minutes', { count: 45 })    // "45 min"
t('servings', { count: 8 })           // "8 servings"
t('actions.viewRecipe')               // "View Recipe"
t('card.viewRecipe', { title })       // "View Recipe Title"
```

## Performance Considerations

- **Image Optimization**: Uses responsive images with proper aspect ratios
- **Hover Effects**: CSS-only transitions for smooth performance
- **Component Composition**: Efficient re-rendering with proper props
- **Event Handling**: Optimized event delegation and stopping propagation

## Cultural Sensitivity

- **Global Cuisine Support**: Flexible tag system for cultural categories
- **Measurement Systems**: Integration with locale-aware measurement conversion
- **Dietary Restrictions**: Comprehensive tag system for cultural dietary needs
- **Author Representation**: Support for diverse author backgrounds and verification

## Testing

The component includes comprehensive test coverage:

- Component rendering and props
- User interactions (click, save, share)
- Variant-specific behavior
- Time formatting and display
- Accessibility features
- Responsive design elements

Run tests with:
```bash
npm run test src/components/organisms/recipe-card/RecipeCard.test.tsx
```

## Storybook Documentation

Comprehensive Storybook stories demonstrate:

- All three variants with sample data
- Interactive state examples
- Grid layout demonstrations
- Mobile responsive views
- RTL language testing
- Error and loading states

View stories with:
```bash
npm run storybook
```

Navigate to `Organisms/RecipeCard` to explore all examples.