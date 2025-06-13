import React, { useState, useRef, useEffect } from 'react';
import { Heart, Bookmark, Plus, Check, X, ChevronDown, Loader2, FolderPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/Button';

// Types and interfaces
export interface Collection {
  id: string;
  name: string;
  description?: string;
  isDefault?: boolean;
  recipeCount?: number;
}

export type SaveState = 'idle' | 'saving' | 'saved' | 'error';

export interface RecipeCollectionSaverProps {
  recipeId: string;
  collections: Collection[];
  savedCollections: string[];
  onSave: (collectionId: string) => void;
  onUnsave: (collectionId: string) => void;
  onCreateCollection: (name: string) => void;
  variant?: 'heart' | 'bookmark' | 'plus';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  saveState?: SaveState;
  quickSaveToFavorites?: boolean;
}

const RecipeCollectionSaver: React.FC<RecipeCollectionSaverProps> = ({
  recipeId: _recipeId, // eslint-disable-line @typescript-eslint/no-unused-vars
  collections,
  savedCollections,
  onSave,
  onUnsave,
  onCreateCollection,
  variant = 'heart',
  size = 'md',
  className,
  disabled = false,
  saveState = 'idle',
  quickSaveToFavorites = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [showNewCollectionInput, setShowNewCollectionInput] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get the favorites collection (default collection)
  const favoritesCollection = collections.find(c => c.isDefault) || collections[0];
  const isSavedToFavorites = favoritesCollection && savedCollections.includes(favoritesCollection.id);
  const isAnySaved = savedCollections.length > 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowNewCollectionInput(false);
        setNewCollectionName('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus input when showing new collection input
  useEffect(() => {
    if (showNewCollectionInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showNewCollectionInput]);

  // Get icon based on variant
  const getIcon = () => {
    const iconSize = size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';
    
    if (saveState === 'saving') {
      return <Loader2 className={cn(iconSize, 'animate-spin')} />;
    }

    switch (variant) {
      case 'bookmark':
        return <Bookmark className={cn(iconSize, isAnySaved && 'fill-current')} />;
      case 'plus':
        return isAnySaved ? <Check className={iconSize} /> : <Plus className={iconSize} />;
      case 'heart':
      default:
        return <Heart className={cn(iconSize, isAnySaved && 'fill-red-500 text-red-500')} />;
    }
  };

  // Handle quick save to favorites
  const handleQuickSave = () => {
    if (!favoritesCollection) return;
    
    if (isSavedToFavorites) {
      onUnsave(favoritesCollection.id);
    } else {
      onSave(favoritesCollection.id);
    }
  };

  // Handle collection toggle
  const handleCollectionToggle = (collectionId: string) => {
    if (savedCollections.includes(collectionId)) {
      onUnsave(collectionId);
    } else {
      onSave(collectionId);
    }
  };

  // Handle new collection creation
  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      onCreateCollection(newCollectionName.trim());
      setNewCollectionName('');
      setShowNewCollectionInput(false);
    }
  };

  // Handle key press in new collection input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateCollection();
    } else if (e.key === 'Escape') {
      setShowNewCollectionInput(false);
      setNewCollectionName('');
    }
  };

  const buttonSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'sm';
  
  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      {/* Main save button */}
      <div className="flex">
        {quickSaveToFavorites && favoritesCollection ? (
          <>
            {/* Quick save button */}
            <Button
              variant="outline"
              size={buttonSize}
              onClick={handleQuickSave}
              disabled={disabled || saveState === 'saving'}
              className={cn(
                'flex-1 rounded-r-none border-r-0',
                isAnySaved && variant === 'heart' && 'text-red-500 border-red-200 hover:bg-red-50',
                saveState === 'error' && 'border-red-300 text-red-600'
              )}
              aria-label={`${isSavedToFavorites ? 'Remove from' : 'Save to'} ${favoritesCollection.name}`}
            >
              {getIcon()}
              <span className={cn('ml-2', size === 'sm' && 'text-xs')}>
                {saveState === 'saving' ? 'Saving...' : 
                 saveState === 'error' ? 'Error' :
                 isSavedToFavorites ? 'Saved' : 'Save'}
              </span>
            </Button>
            
            {/* Dropdown toggle button */}
            <Button
              variant="outline"
              size={buttonSize}
              onClick={() => setIsOpen(!isOpen)}
              disabled={disabled}
              className="px-2 rounded-l-none"
              aria-label="Choose collections"
            >
              <ChevronDown className={cn(
                size === 'sm' ? 'h-3 w-3' : 'h-4 w-4',
                'transition-transform',
                isOpen && 'rotate-180'
              )} />
            </Button>
          </>
        ) : (
          /* Single button when no quick save */
          <Button
            variant="outline"
            size={buttonSize}
            onClick={() => setIsOpen(!isOpen)}
            disabled={disabled || saveState === 'saving'}
            className={cn(
              isAnySaved && variant === 'heart' && 'text-red-500 border-red-200 hover:bg-red-50',
              saveState === 'error' && 'border-red-300 text-red-600'
            )}
            aria-label="Manage collections"
          >
            {getIcon()}
            <span className={cn('ml-2', size === 'sm' && 'text-xs')}>
              {saveState === 'saving' ? 'Saving...' : 
               saveState === 'error' ? 'Error' :
               isAnySaved ? `Saved (${savedCollections.length})` : 'Save'}
            </span>
            <ChevronDown className={cn(
              'ml-2',
              size === 'sm' ? 'h-3 w-3' : 'h-4 w-4',
              'transition-transform',
              isOpen && 'rotate-180'
            )} />
          </Button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className={cn(
          'absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50',
          'animate-in fade-in-0 zoom-in-95 duration-100'
        )}>
          <div className="p-2">
            <div className="text-sm font-medium text-gray-700 px-2 py-1 mb-2">
              Save to Collections
            </div>
            
            {/* Collections list */}
            <div className="max-h-48 overflow-y-auto">
              {collections.map((collection) => {
                const isSaved = savedCollections.includes(collection.id);
                return (
                  <button
                    key={collection.id}
                    onClick={() => handleCollectionToggle(collection.id)}
                    className={cn(
                      'w-full flex items-center justify-between px-2 py-2 text-sm rounded-md',
                      'hover:bg-gray-100 transition-colors text-left',
                      isSaved && 'bg-blue-50 text-blue-700'
                    )}
                  >
                    <div className="flex-1">
                      <div className="font-medium">{collection.name}</div>
                      {collection.description && (
                        <div className="text-xs text-gray-500 truncate">
                          {collection.description}
                        </div>
                      )}
                      {collection.recipeCount !== undefined && (
                        <div className="text-xs text-gray-400">
                          {collection.recipeCount} recipes
                        </div>
                      )}
                    </div>
                    {isSaved && (
                      <Check className="h-4 w-4 text-blue-600 ml-2 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Create new collection */}
            <div className="border-t border-gray-100 mt-2 pt-2">
              {showNewCollectionInput ? (
                <div className="space-y-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Collection name"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={50}
                  />
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={handleCreateCollection}
                      disabled={!newCollectionName.trim()}
                      className="flex-1 text-xs"
                    >
                      Create
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowNewCollectionInput(false);
                        setNewCollectionName('');
                      }}
                      className="flex-1 text-xs"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowNewCollectionInput(true)}
                  className="w-full flex items-center px-2 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Create new collection
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCollectionSaver;