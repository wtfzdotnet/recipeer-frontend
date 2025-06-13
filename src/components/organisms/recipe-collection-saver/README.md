# RecipeCollectionSaver Component

A sophisticated React component for saving recipes to collections with support for quick save, collection selection, and inline collection creation.

## Features

- **Save/unsave toggle** with visual feedback (heart fills, bookmark fills, plus becomes check)
- **Collection selection** dropdown with scrollable list  
- **Quick save to favorites** with one-click action
- **Collection creation** inline functionality with form validation
- **Visual save states** (saved, saving, error) with appropriate styling
- **Multiple variants** ('heart' | 'bookmark' | 'plus')
- **Size options** ('sm' | 'md' | 'lg')
- **Responsive design** with proper mobile interactions
- **Accessibility features** (ARIA labels, keyboard navigation)
- **Error handling** and disabled states
- **Optimistic UI updates**

## Basic Usage

```tsx
import { RecipeCollectionSaver } from '@/components/RecipeCollectionSaver';

const MyComponent = () => {
  const [savedCollections, setSavedCollections] = useState<string[]>([]);
  
  const handleSave = (collectionId: string) => {
    setSavedCollections(prev => [...prev, collectionId]);
  };
  
  const handleUnsave = (collectionId: string) => {
    setSavedCollections(prev => prev.filter(id => id !== collectionId));
  };
  
  const handleCreateCollection = (name: string) => {
    // Create new collection
    console.log('Creating collection:', name);
  };

  return (
    <RecipeCollectionSaver
      recipeId="recipe-123"
      collections={collections}
      savedCollections={savedCollections}
      onSave={handleSave}
      onUnsave={handleUnsave}
      onCreateCollection={handleCreateCollection}
      variant="heart"
      size="md"
      quickSaveToFavorites={true}
    />
  );
};
```

## Integration with RecipeCard

Replace the simple save button in RecipeCard with the full collection functionality:

```tsx
// Before - Simple save button
<Button variant="outline" size="sm" onClick={onSave}>
  <Heart className="h-4 w-4 mr-2" />
  {isSaved ? 'Saved' : 'Save'}
</Button>

// After - Full collection management
<RecipeCollectionSaver
  recipeId={recipe.id}
  collections={userCollections}
  savedCollections={recipe.savedCollections}
  onSave={handleSaveToCollection}
  onUnsave={handleUnsaveFromCollection}
  onCreateCollection={handleCreateCollection}
  variant="heart"
  size="sm"
  quickSaveToFavorites={true}
  className="flex-1"
/>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `recipeId` | `string` | - | **Required.** Unique identifier for the recipe |
| `collections` | `Collection[]` | - | **Required.** Available collections to save to |
| `savedCollections` | `string[]` | - | **Required.** Array of collection IDs this recipe is saved to |
| `onSave` | `(collectionId: string) => void` | - | **Required.** Called when recipe is saved to a collection |
| `onUnsave` | `(collectionId: string) => void` | - | **Required.** Called when recipe is unsaved from a collection |
| `onCreateCollection` | `(name: string) => void` | - | **Required.** Called when new collection is created |
| `variant` | `'heart' \| 'bookmark' \| 'plus'` | `'heart'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size |
| `className` | `string` | - | Additional CSS classes |
| `disabled` | `boolean` | `false` | Whether the component is disabled |
| `saveState` | `'idle' \| 'saving' \| 'saved' \| 'error'` | `'idle'` | Current save state |
| `quickSaveToFavorites` | `boolean` | `true` | Enable quick save button for favorites |

### Collection Interface

```tsx
interface Collection {
  id: string;
  name: string;
  description?: string;
  isDefault?: boolean;
  recipeCount?: number;
}
```

## Variants

### Heart Variant (Default)
- Uses heart icon that fills red when saved
- Most common for recipe saving

### Bookmark Variant  
- Uses bookmark icon that fills when saved
- Good for "read later" or reference functionality

### Plus Variant
- Uses plus icon that becomes a check when saved
- Good for adding to lists or collections

## States

### Save States
- **Idle**: Default state, ready for interaction
- **Saving**: Shows spinner and "Saving..." text
- **Saved**: Indicates successful save
- **Error**: Shows error styling and "Error" text

### Disabled State
- All interactions disabled
- Visual feedback shows disabled styling

## Accessibility

- Full keyboard navigation support
- ARIA labels for screen readers
- Focus management for dropdown interactions
- Semantic button roles and labels

## Examples

See the Storybook stories for comprehensive examples of all variants and states:
- Default behaviors
- Size variants  
- Save states
- Error handling
- Collection creation
- Integration examples

## Testing

The component includes comprehensive unit tests covering:
- All variants and sizes
- Save/unsave functionality
- Dropdown interactions
- Collection creation
- Error states
- Accessibility features
- Edge cases

Run tests with:
```bash
npm test RecipeCollectionSaver
```