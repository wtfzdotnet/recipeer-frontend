import type { Meta, StoryObj } from '@storybook/react-vite'
import { 
  ChefHat, 
  Search, 
  Heart, 
  BookOpen, 
  Settings, 
  User, 
  Globe, 
  Utensils,
  Clock,
  Star,
  Plus,
  Filter,
  Download,
  Share,
  Edit,
  Trash,
  Eye,
  EyeOff
} from 'lucide-react'
import { Menubar } from './menubar'

// Simple mock function for stories
const fn = () => () => {};

const meta: Meta<typeof Menubar> = {
  title: 'Atoms/Menubar',
  component: Menubar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Accessible menubar component for professional chef interfaces and advanced user navigation.'
      }
    }
  },
  argTypes: {
    onMenuSelect: { action: 'menu-selected' },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    menus: [
      {
        trigger: 'File',
        items: [
          { type: 'item', label: 'New Recipe', value: 'new', shortcut: '⌘N', icon: <Plus className="h-4 w-4" /> },
          { type: 'item', label: 'Open Recipe', value: 'open', shortcut: '⌘O', icon: <BookOpen className="h-4 w-4" /> },
          { type: 'separator' },
          { type: 'item', label: 'Save Recipe', value: 'save', shortcut: '⌘S' },
          { type: 'item', label: 'Export Recipe', value: 'export', icon: <Download className="h-4 w-4" /> },
          { type: 'separator' },
          { type: 'item', label: 'Share Recipe', value: 'share', icon: <Share className="h-4 w-4" /> },
        ]
      },
      {
        trigger: 'Edit',
        items: [
          { type: 'item', label: 'Edit Recipe', value: 'edit', shortcut: '⌘E', icon: <Edit className="h-4 w-4" /> },
          { type: 'item', label: 'Delete Recipe', value: 'delete', icon: <Trash className="h-4 w-4" /> },
          { type: 'separator' },
          { type: 'item', label: 'Find Recipes', value: 'find', shortcut: '⌘F', icon: <Search className="h-4 w-4" /> },
        ]
      },
      {
        trigger: 'View',
        items: [
          { type: 'checkbox', label: 'Show Nutrition Info', value: 'nutrition', checked: true },
          { type: 'checkbox', label: 'Show Cultural Context', value: 'cultural', checked: false },
          { type: 'checkbox', label: 'Show Chef Notes', value: 'notes', checked: true },
        ]
      }
    ],
    onMenuSelect: fn(),
  }
}

// Professional chef interface
export const ProfessionalChefInterface: Story = {
  args: {
    menus: [
      {
        trigger: 'Recipes',
        items: [
          { type: 'item', label: 'Create New Recipe', value: 'create', icon: <ChefHat className="h-4 w-4" /> },
          { type: 'item', label: 'Recipe Collection', value: 'collection', icon: <BookOpen className="h-4 w-4" /> },
          { type: 'separator' },
          { type: 'submenu', label: 'Import Recipe', value: 'import', icon: <Download className="h-4 w-4" />, submenu: [
            { type: 'item', label: 'From URL', value: 'import-url' },
            { type: 'item', label: 'From File', value: 'import-file' },
            { type: 'item', label: 'From Photo', value: 'import-photo' },
          ]},
          { type: 'submenu', label: 'Export Recipe', value: 'export', icon: <Share className="h-4 w-4" />, submenu: [
            { type: 'item', label: 'As PDF', value: 'export-pdf' },
            { type: 'item', label: 'As JSON', value: 'export-json' },
            { type: 'item', label: 'To Social Media', value: 'export-social' },
          ]},
        ]
      },
      {
        trigger: 'Kitchen',
        items: [
          { type: 'item', label: 'Active Timers', value: 'timers', icon: <Clock className="h-4 w-4" /> },
          { type: 'item', label: 'Kitchen Scale', value: 'scale', icon: <Utensils className="h-4 w-4" /> },
          { type: 'separator' },
          { type: 'checkbox', label: 'Voice Commands', value: 'voice', checked: true },
          { type: 'checkbox', label: 'Auto-Scale Portions', value: 'scale-portions', checked: false },
          { type: 'checkbox', label: 'Smart Substitutions', value: 'substitutions', checked: true },
        ]
      },
      {
        trigger: 'Cultural',
        items: [
          { type: 'label', label: 'Heritage Features' },
          { type: 'item', label: 'Cultural Authenticity Check', value: 'authenticity', icon: <Globe className="h-4 w-4" /> },
          { type: 'item', label: 'Traditional Techniques', value: 'techniques' },
          { type: 'separator' },
          { type: 'radio', label: 'Mediterranean', value: 'mediterranean', radioGroup: 'cuisine', checked: true },
          { type: 'radio', label: 'Asian', value: 'asian', radioGroup: 'cuisine' },
          { type: 'radio', label: 'Latin American', value: 'latin', radioGroup: 'cuisine' },
          { type: 'radio', label: 'African', value: 'african', radioGroup: 'cuisine' },
        ]
      },
      {
        trigger: 'Tools',
        items: [
          { type: 'item', label: 'Nutrition Calculator', value: 'nutrition' },
          { type: 'item', label: 'Cost Calculator', value: 'cost' },
          { type: 'item', label: 'Inventory Manager', value: 'inventory' },
          { type: 'separator' },
          { type: 'item', label: 'Recipe Analyzer', value: 'analyzer' },
          { type: 'item', label: 'Allergen Scanner', value: 'allergen' },
        ]
      },
      {
        trigger: 'Settings',
        items: [
          { type: 'item', label: 'User Preferences', value: 'preferences', icon: <User className="h-4 w-4" /> },
          { type: 'item', label: 'Kitchen Setup', value: 'setup', icon: <Settings className="h-4 w-4" /> },
          { type: 'separator' },
          { type: 'submenu', label: 'Accessibility', value: 'accessibility', submenu: [
            { type: 'checkbox', label: 'High Contrast', value: 'high-contrast', checked: false },
            { type: 'checkbox', label: 'Large Text', value: 'large-text', checked: false },
            { type: 'checkbox', label: 'Screen Reader Mode', value: 'screen-reader', checked: false },
            { type: 'checkbox', label: 'Voice Navigation', value: 'voice-nav', checked: true },
          ]},
        ]
      }
    ],
    onMenuSelect: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Professional chef interface with comprehensive menu system for advanced recipe management.'
      }
    }
  }
}

// Cultural heritage focused
export const CulturalHeritageInterface: Story = {
  args: {
    menus: [
      {
        trigger: 'Heritage',
        items: [
          { type: 'item', label: 'Submit Traditional Recipe', value: 'submit', icon: <Heart className="h-4 w-4" /> },
          { type: 'item', label: 'Cultural Verification', value: 'verify', icon: <Star className="h-4 w-4" /> },
          { type: 'separator' },
          { type: 'submenu', label: 'Browse by Region', value: 'browse', icon: <Globe className="h-4 w-4" />, submenu: [
            { type: 'item', label: 'Mediterranean', value: 'mediterranean' },
            { type: 'item', label: 'Southeast Asian', value: 'southeast-asian' },
            { type: 'item', label: 'West African', value: 'west-african' },
            { type: 'item', label: 'Central American', value: 'central-american' },
            { type: 'item', label: 'Nordic', value: 'nordic' },
          ]},
        ]
      },
      {
        trigger: 'Community',
        items: [
          { type: 'item', label: 'Expert Reviews', value: 'reviews' },
          { type: 'item', label: 'Cultural Discussions', value: 'discussions' },
          { type: 'separator' },
          { type: 'checkbox', label: 'Show Expert Badges', value: 'expert-badges', checked: true },
          { type: 'checkbox', label: 'Cultural Context Warnings', value: 'context-warnings', checked: true },
          { type: 'checkbox', label: 'Appropriation Alerts', value: 'appropriation-alerts', checked: true },
        ]
      },
      {
        trigger: 'Languages',
        items: [
          { type: 'radio', label: 'English', value: 'en', radioGroup: 'language', checked: true },
          { type: 'radio', label: 'Español', value: 'es', radioGroup: 'language' },
          { type: 'radio', label: 'Français', value: 'fr', radioGroup: 'language' },
          { type: 'radio', label: '中文', value: 'zh', radioGroup: 'language' },
          { type: 'radio', label: 'العربية', value: 'ar', radioGroup: 'language' },
        ]
      }
    ],
    onMenuSelect: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Cultural heritage-focused interface for traditional recipe preservation and community validation.'
      }
    }
  }
}

// Accessibility features demonstration
export const AccessibilityFeatures: Story = {
  render: () => {
    const accessibilityMenus = [
      {
        trigger: 'View',
        items: [
          { type: 'checkbox', label: 'High Contrast Mode', value: 'high-contrast', checked: false, icon: <Eye className="h-4 w-4" /> },
          { type: 'checkbox', label: 'Large Text Size', value: 'large-text', checked: false },
          { type: 'checkbox', label: 'Reduce Motion', value: 'reduce-motion', checked: false },
          { type: 'separator' },
          { type: 'submenu', label: 'Screen Reader', value: 'screen-reader', icon: <Settings className="h-4 w-4" />, submenu: [
            { type: 'checkbox', label: 'Announce Navigation', value: 'announce-nav', checked: true },
            { type: 'checkbox', label: 'Announce Content Changes', value: 'announce-changes', checked: true },
            { type: 'checkbox', label: 'Skip Link Support', value: 'skip-links', checked: true },
          ]},
        ]
      },
      {
        trigger: 'Navigation',
        items: [
          { type: 'item', label: 'Keyboard Shortcuts Help', value: 'shortcuts', shortcut: '⌘?' },
          { type: 'separator' },
          { type: 'checkbox', label: 'Focus Indicators', value: 'focus-indicators', checked: true },
          { type: 'checkbox', label: 'Skip to Content', value: 'skip-content', checked: true },
          { type: 'checkbox', label: 'Voice Navigation', value: 'voice-nav', checked: false },
        ]
      },
      {
        trigger: 'Motor',
        items: [
          { type: 'checkbox', label: 'Large Click Targets', value: 'large-targets', checked: true },
          { type: 'checkbox', label: 'Sticky Drag', value: 'sticky-drag', checked: false },
          { type: 'checkbox', label: 'One-Hand Mode', value: 'one-hand', checked: false },
          { type: 'separator' },
          { type: 'radio', label: 'Normal Timing', value: 'normal', radioGroup: 'timing', checked: true },
          { type: 'radio', label: 'Extended Timing', value: 'extended', radioGroup: 'timing' },
          { type: 'radio', label: 'No Time Limits', value: 'no-limits', radioGroup: 'timing' },
        ]
      }
    ];

    return (
      <div className="space-y-6 w-full max-w-4xl">
        <h3 className="text-lg font-semibold">Accessibility Features</h3>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Comprehensive accessibility menubar with WCAG AA+ compliance features.
            All items support keyboard navigation, screen readers, and assistive technologies.
          </p>
          <Menubar 
            menus={accessibilityMenus}
            onMenuSelect={fn()}
            aria-label="Accessibility settings menu"
          />
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Use Tab to navigate between menu triggers</p>
            <p>• Use Arrow keys to navigate within menus</p>
            <p>• Use Enter/Space to activate items</p>
            <p>• Use Escape to close menus</p>
            <p>• All shortcuts work with keyboard navigation</p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Accessibility-focused menubar demonstrating WCAG compliance features and keyboard navigation.'
      }
    }
  }
}

// Cultural considerations demo
export const CulturalConsiderations: Story = {
  render: () => {
    const culturalMenus = [
      {
        trigger: 'Heritage Recipes',
        items: [
          { type: 'item', label: 'Submit Family Recipe', value: 'family-recipe', icon: <Heart className="h-4 w-4" /> },
          { type: 'item', label: 'Cultural Expert Review', value: 'expert-review', icon: <Star className="h-4 w-4" /> },
          { type: 'separator' },
          { type: 'submenu', label: 'Regional Specialties', value: 'regional', submenu: [
            { type: 'item', label: 'Levantine Cuisine', value: 'levantine' },
            { type: 'item', label: 'Maghrebi Dishes', value: 'maghrebi' },
            { type: 'item', label: 'South Indian Vegetarian', value: 'south-indian' },
            { type: 'item', label: 'Ethiopian Traditional', value: 'ethiopian' },
          ]},
        ]
      },
      {
        trigger: 'Cultural Context',
        items: [
          { type: 'checkbox', label: 'Show Recipe Origins', value: 'origins', checked: true },
          { type: 'checkbox', label: 'Cultural Significance', value: 'significance', checked: true },
          { type: 'checkbox', label: 'Traditional Techniques', value: 'techniques', checked: false },
          { type: 'separator' },
          { type: 'checkbox', label: 'Appropriation Warnings', value: 'warnings', checked: true },
          { type: 'checkbox', label: 'Respectful Attribution', value: 'attribution', checked: true },
        ]
      },
      {
        trigger: 'Community Standards',
        items: [
          { type: 'item', label: 'Cultural Guidelines', value: 'guidelines' },
          { type: 'item', label: 'Report Inappropriate Content', value: 'report' },
          { type: 'separator' },
          { type: 'item', label: 'Expert Verification Status', value: 'verification' },
          { type: 'item', label: 'Community Feedback', value: 'feedback' },
        ]
      }
    ];

    return (
      <div className="space-y-6 w-full max-w-4xl">
        <h3 className="text-lg font-semibold">Cultural Considerations</h3>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Culturally-sensitive menubar for recipe heritage preservation and respectful cultural exchange.
            Features community validation and expert verification systems.
          </p>
          <Menubar 
            menus={culturalMenus}
            onMenuSelect={fn()}
            aria-label="Cultural heritage recipe menu"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Cultural heritage and sensitivity features for respectful recipe sharing and preservation.'
      }
    }
  }
}

// Right-to-left language support
export const RightToLeftSupport: Story = {
  render: () => {
    const rtlMenus = [
      {
        trigger: 'ملف',
        items: [
          { type: 'item', label: 'وصفة جديدة', value: 'new-recipe' },
          { type: 'item', label: 'فتح وصفة', value: 'open-recipe' },
          { type: 'separator' },
          { type: 'item', label: 'حفظ الوصفة', value: 'save-recipe' },
          { type: 'item', label: 'تصدير الوصفة', value: 'export-recipe' },
        ]
      },
      {
        trigger: 'عرض',
        items: [
          { type: 'checkbox', label: 'إظهار المعلومات الغذائية', value: 'nutrition', checked: true },
          { type: 'checkbox', label: 'إظهار السياق الثقافي', value: 'cultural', checked: false },
          { type: 'checkbox', label: 'إظهار ملاحظات الطاهي', value: 'notes', checked: true },
        ]
      },
      {
        trigger: 'المطبخ',
        items: [
          { type: 'radio', label: 'مطبخ عربي', value: 'arabic', radioGroup: 'cuisine', checked: true },
          { type: 'radio', label: 'مطبخ تركي', value: 'turkish', radioGroup: 'cuisine' },
          { type: 'radio', label: 'مطبخ فارسي', value: 'persian', radioGroup: 'cuisine' },
          { type: 'radio', label: 'مطبخ مغربي', value: 'moroccan', radioGroup: 'cuisine' },
        ]
      }
    ];

    return (
      <div className="space-y-6 w-full max-w-4xl" dir="rtl">
        <h3 className="text-lg font-semibold">دعم اللغات من اليمين إلى اليسار</h3>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            شريط قوائم يدعم اللغات من اليمين إلى اليسار مع الحفاظ على إمكانية الوصول الكاملة
          </p>
          <Menubar 
            menus={rtlMenus}
            onMenuSelect={fn()}
            aria-label="قائمة الوصفات العربية"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Right-to-left language support demonstration with Arabic interface elements.'
      }
    }
  }
}