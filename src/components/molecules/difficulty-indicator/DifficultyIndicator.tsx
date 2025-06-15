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
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success',
    icon: 1,
    description: 'Perfect for cooking beginners'
  },
  intermediate: {
    label: 'Intermediate',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning',
    icon: 2,
    description: 'Requires some cooking experience'
  },
  advanced: {
    label: 'Advanced',
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    borderColor: 'border-destructive',
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
                ? 'fill-current text-warning' 
                : 'text-muted-foreground'
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

// Utility function to map legacy difficulty levels to new levels
export const mapLegacyDifficulty = (legacyLevel: 'Easy' | 'Medium' | 'Hard'): 'beginner' | 'intermediate' | 'advanced' => {
  switch (legacyLevel) {
    case 'Easy':
      return 'beginner';
    case 'Medium':
      return 'intermediate';
    case 'Hard':
      return 'advanced';
    default:
      return 'beginner';
  }
};

// Utility function to suggest factors based on difficulty level
export const suggestFactorsForLevel = (level: 'beginner' | 'intermediate' | 'advanced'): { prep: number; technique: number; time: number } => {
  switch (level) {
    case 'beginner':
      return { prep: 1, technique: 1, time: 2 };
    case 'intermediate':
      return { prep: 3, technique: 3, time: 3 };
    case 'advanced':
      return { prep: 4, technique: 4, time: 4 };
    default:
      return { prep: 1, technique: 1, time: 2 };
  }
};

export default DifficultyIndicator;