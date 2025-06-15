/**
 * Utility functions for DifficultyIndicator component
 */

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