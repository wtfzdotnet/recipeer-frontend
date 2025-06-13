import React from 'react';
import { ChefHat, Star, Clock, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

// Core interface as specified in the requirements
export interface DifficultyIndicatorProps {
  /** Difficulty level of the recipe */
  level: 'beginner' | 'intermediate' | 'advanced';
  /** Optional detailed factors breakdown */
  factors?: {
    /** Preparation complexity (1-5 scale) */
    prep: number;
    /** Technique difficulty (1-5 scale) */
    technique: number;
    /** Time investment (1-5 scale) */
    time: number;
  };
  /** Show detailed breakdown of factors */
  showDetails?: boolean;
  /** Display variant */
  variant?: 'compact' | 'detailed' | 'icon-only';
  /** Additional CSS classes */
  className?: string;
}

// Difficulty level configuration
const difficultyConfig = {
  beginner: {
    label: 'Beginner',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    icon: 1,
    description: 'Perfect for cooking beginners'
  },
  intermediate: {
    label: 'Intermediate',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    icon: 2,
    description: 'Requires some cooking experience'
  },
  advanced: {
    label: 'Advanced',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    icon: 3,
    description: 'For experienced home cooks'
  }
};

// Factor configuration for detailed breakdown
const factorConfig = {
  prep: {
    label: 'Prep Complexity',
    icon: Target,
    description: 'How complex is the preparation?'
  },
  technique: {
    label: 'Technique',
    icon: ChefHat,
    description: 'Technical skill required'
  },
  time: {
    label: 'Time Investment',
    icon: Clock,
    description: 'Time complexity and commitment'
  }
};

// Utility to render difficulty icons (chef hats)
const DifficultyIcons: React.FC<{ level: number; size?: 'sm' | 'md' | 'lg' }> = ({ 
  level, 
  size = 'md' 
}) => {
  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  return (
    <div className="flex items-center space-x-0.5" aria-label={`${level} out of 3 difficulty level`}>
      {[1, 2, 3].map((index) => (
        <ChefHat
          key={index}
          className={cn(
            iconSizes[size],
            index <= level 
              ? 'text-current fill-current' 
              : 'text-gray-300'
          )}
        />
      ))}
    </div>
  );
};

// Factor rating component for detailed view
const FactorRating: React.FC<{
  factor: keyof typeof factorConfig;
  value: number;
  compact?: boolean;
}> = ({ factor, value, compact = false }) => {
  const config = factorConfig[factor];
  const Icon = config.icon;

  return (
    <div className={cn(
      "flex items-center",
      compact ? "space-x-1" : "space-x-2"
    )}>
      <Icon className={cn(
        compact ? "h-3 w-3" : "h-4 w-4",
        "text-muted-foreground"
      )} />
      <span className={cn(
        compact ? "text-xs" : "text-sm",
        "text-muted-foreground"
      )}>
        {config.label}:
      </span>
      <div className="flex items-center space-x-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              compact ? "h-2.5 w-2.5" : "h-3 w-3",
              star <= value 
                ? 'fill-current text-amber-400' 
                : 'text-gray-300'
            )}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Recipe Difficulty Indicator Component
 * 
 * Displays recipe difficulty levels with visual indicators, optional detailed breakdowns,
 * and multiple display variants. Supports accessibility and internationalization.
 */
export const DifficultyIndicator: React.FC<DifficultyIndicatorProps> = ({
  level,
  factors,
  showDetails = false,
  variant = 'compact',
  className
}) => {
  const config = difficultyConfig[level];

  // Icon-only variant
  if (variant === 'icon-only') {
    return (
      <div 
        className={cn("flex items-center", className)}
        title={`${config.label} difficulty`}
        aria-label={`Recipe difficulty: ${config.label}`}
      >
        <DifficultyIcons level={config.icon} />
      </div>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <div 
        className={cn(
          "flex items-center space-x-2",
          className
        )}
        aria-label={`Recipe difficulty: ${config.label}`}
      >
        <div className="flex items-center space-x-1">
          <DifficultyIcons level={config.icon} size="sm" />
          <span className={cn("text-sm font-medium", config.color)}>
            {config.label}
          </span>
        </div>
        {showDetails && factors && (
          <div className="flex items-center space-x-3 text-xs">
            {Object.entries(factors).map(([key, value]) => (
              <FactorRating
                key={key}
                factor={key as keyof typeof factorConfig}
                value={value}
                compact
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Detailed variant
  return (
    <div 
      className={cn(
        "rounded-lg border p-4",
        config.bgColor,
        config.borderColor,
        className
      )}
      aria-label={`Recipe difficulty: ${config.label}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <DifficultyIcons level={config.icon} size="lg" />
          <div>
            <h3 className={cn("font-semibold", config.color)}>
              {config.label}
            </h3>
            <p className="text-sm text-muted-foreground">
              {config.description}
            </p>
          </div>
        </div>
      </div>

      {showDetails && factors && (
        <div className="mt-3 space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            Skill Breakdown
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(factors).map(([key, value]) => (
              <FactorRating
                key={key}
                factor={key as keyof typeof factorConfig}
                value={value}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DifficultyIndicator;