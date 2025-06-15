import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { scaleQuantity } from './quantity-utils';

export interface QuantityAdjusterProps {
  /** Original serving size of the recipe */
  originalServings: number;
  /** Current serving size */
  currentServings: number;
  /** Callback when serving size changes */
  onServingsChange: (servings: number) => void;
  /** Minimum allowed servings */
  minServings?: number;
  /** Maximum allowed servings */
  maxServings?: number;
  /** Step increment for serving adjustments */
  step?: number;
  /** Additional CSS classes */
  className?: string;
  /** Whether the component is disabled */
  disabled?: boolean;
}

/**
 * QuantityAdjuster component for scaling recipe serving sizes
 * Automatically calculates ingredient quantities based on serving adjustments
 */
export const QuantityAdjuster: React.FC<QuantityAdjusterProps> = ({
  originalServings,
  currentServings,
  onServingsChange,
  minServings = 1,
  maxServings = 20,
  step = 1,
  className,
  disabled = false,
}) => {
  const canDecrease = currentServings > minServings;
  const canIncrease = currentServings < maxServings;
  
  const handleDecrease = () => {
    if (canDecrease) {
      const newServings = Math.max(minServings, currentServings - step);
      onServingsChange(newServings);
    }
  };

  const handleIncrease = () => {
    if (canIncrease) {
      const newServings = Math.min(maxServings, currentServings + step);
      onServingsChange(newServings);
    }
  };

  const scalingFactor = currentServings / originalServings;
  const isScaled = currentServings !== originalServings;

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <Button
        variant="outline"
        size="icon"
        onClick={handleDecrease}
        disabled={disabled || !canDecrease}
        aria-label="Decrease serving size"
        className="h-8 w-8"
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <div className="flex flex-col items-center min-w-20">
        <div className="text-lg font-semibold">
          {currentServings}
        </div>
        <div className="text-sm text-muted-foreground">
          {currentServings === 1 ? 'serving' : 'servings'}
        </div>
        {isScaled && (
          <div className="text-xs text-primary font-medium">
            {scalingFactor > 1 ? `×${scalingFactor.toFixed(1)}` : `×${scalingFactor.toFixed(2)}`}
          </div>
        )}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={handleIncrease}
        disabled={disabled || !canIncrease}
        aria-label="Increase serving size"
        className="h-8 w-8"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantityAdjuster;