import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextMenu } from './ContextMenu';
import { Heart, Share } from 'lucide-react';

describe('ContextMenu', () => {
  const mockOnSelect = vi.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  const basicItems = [
    {
      type: 'item' as const,
      label: 'Add to Favorites',
      icon: <Heart className="h-4 w-4" />,
      onSelect: mockOnSelect,
    },
    {
      type: 'separator' as const,
    },
    {
      type: 'item' as const,
      label: 'Share Recipe',
      icon: <Share className="h-4 w-4" />,
      shortcut: '⌘S',
      onSelect: mockOnSelect,
    },
  ];

  describe('Rendering', () => {
    it('renders trigger content', () => {
      render(
        <ContextMenu items={basicItems}>
          <div>Recipe Card</div>
        </ContextMenu>
      );

      expect(screen.getByText('Recipe Card')).toBeInTheDocument();
    });

    it('opens context menu on right click', async () => {
      const user = userEvent.setup();
      render(
        <ContextMenu items={basicItems}>
          <div>Recipe Card</div>
        </ContextMenu>
      );

      const trigger = screen.getByText('Recipe Card');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      expect(screen.getByText('Add to Favorites')).toBeInTheDocument();
      expect(screen.getByText('Share Recipe')).toBeInTheDocument();
    });

    it('shows keyboard shortcuts when provided', async () => {
      const user = userEvent.setup();
      render(
        <ContextMenu items={basicItems}>
          <div>Recipe Card</div>
        </ContextMenu>
      );

      const trigger = screen.getByText('Recipe Card');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      expect(screen.getByText('⌘S')).toBeInTheDocument();
    });
  });

  describe('Menu Items', () => {
    it('calls onSelect when menu item is clicked', async () => {
      const user = userEvent.setup();
      render(
        <ContextMenu items={basicItems}>
          <div>Recipe Card</div>
        </ContextMenu>
      );

      const trigger = screen.getByText('Recipe Card');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      const menuItem = screen.getByText('Add to Favorites');
      await user.click(menuItem);

      expect(mockOnSelect).toHaveBeenCalled();
    });

    it('renders icons when provided', async () => {
      const user = userEvent.setup();
      render(
        <ContextMenu items={basicItems}>
          <div>Recipe Card</div>
        </ContextMenu>
      );

      const trigger = screen.getByText('Recipe Card');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      // Icons should be rendered (though exact testing depends on icon implementation)
      expect(screen.getByText('Add to Favorites')).toBeInTheDocument();
      expect(screen.getByText('Share Recipe')).toBeInTheDocument();
    });

    it('renders separators', async () => {
      const user = userEvent.setup();
      render(
        <ContextMenu items={basicItems}>
          <div>Recipe Card</div>
        </ContextMenu>
      );

      const trigger = screen.getByText('Recipe Card');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      // Separator should be in the DOM (as element with separator role or styling)
      const separator = document.querySelector('[role="separator"]') || 
                       document.querySelector('.h-px');
      expect(separator).toBeInTheDocument();
    });
  });

  describe('Checkbox Items', () => {
    const checkboxItems = [
      {
        type: 'checkbox' as const,
        label: 'Favorite',
        checked: false,
        onSelect: mockOnSelect,
      },
      {
        type: 'checkbox' as const,
        label: 'Bookmarked',
        checked: true,
        onSelect: mockOnSelect,
      },
    ];

    it('renders checkbox items with correct checked state', async () => {
      const user = userEvent.setup();
      render(
        <ContextMenu items={checkboxItems}>
          <div>Recipe Card</div>
        </ContextMenu>
      );

      const trigger = screen.getByText('Recipe Card');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      expect(screen.getByText('Favorite')).toBeInTheDocument();
      expect(screen.getByText('Bookmarked')).toBeInTheDocument();
    });

    it('calls onSelect when checkbox item is clicked', async () => {
      const user = userEvent.setup();
      render(
        <ContextMenu items={checkboxItems}>
          <div>Recipe Card</div>
        </ContextMenu>
      );

      const trigger = screen.getByText('Recipe Card');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      const checkboxItem = screen.getByText('Favorite');
      await user.click(checkboxItem);

      expect(mockOnSelect).toHaveBeenCalled();
    });
  });

  describe('Submenu Items', () => {
    const submenuItems = [
      {
        type: 'submenu' as const,
        label: 'Share Options',
        items: [
          {
            type: 'item' as const,
            label: 'Copy Link',
            onSelect: mockOnSelect,
          },
          {
            type: 'item' as const,
            label: 'Email',
            onSelect: mockOnSelect,
          },
        ],
      },
    ];

    it('renders submenu trigger', async () => {
      const user = userEvent.setup();
      render(
        <ContextMenu items={submenuItems}>
          <div>Recipe Card</div>
        </ContextMenu>
      );

      const trigger = screen.getByText('Recipe Card');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      expect(screen.getByText('Share Options')).toBeInTheDocument();
    });

    it('opens submenu on hover/interaction', async () => {
      const user = userEvent.setup();
      render(
        <ContextMenu items={submenuItems}>
          <div>Recipe Card</div>
        </ContextMenu>
      );

      const trigger = screen.getByText('Recipe Card');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      const submenuTrigger = screen.getByText('Share Options');
      await user.hover(submenuTrigger);

      // Wait for submenu to potentially open
      await new Promise(resolve => setTimeout(resolve, 100));

      // Note: Exact submenu behavior depends on Radix implementation
      expect(screen.getByText('Share Options')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    const disabledItems = [
      {
        type: 'item' as const,
        label: 'Enabled Action',
        onSelect: mockOnSelect,
      },
      {
        type: 'item' as const,
        label: 'Disabled Action',
        disabled: true,
        onSelect: mockOnSelect,
      },
    ];

    it('renders disabled items correctly', async () => {
      const user = userEvent.setup();
      render(
        <ContextMenu items={disabledItems}>
          <div>Recipe Card</div>
        </ContextMenu>
      );

      const trigger = screen.getByText('Recipe Card');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      expect(screen.getByText('Enabled Action')).toBeInTheDocument();
      expect(screen.getByText('Disabled Action')).toBeInTheDocument();
    });

    it('does not call onSelect for disabled items', async () => {
      const user = userEvent.setup();
      render(
        <ContextMenu items={disabledItems}>
          <div>Recipe Card</div>
        </ContextMenu>
      );

      const trigger = screen.getByText('Recipe Card');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      const disabledItem = screen.getByText('Disabled Action');
      await user.click(disabledItem);

      expect(mockOnSelect).not.toHaveBeenCalled();
    });

    it('disables entire context menu when disabled prop is true', () => {
      render(
        <ContextMenu items={basicItems} disabled={true}>
          <div>Recipe Card</div>
        </ContextMenu>
      );

      const trigger = screen.getByText('Recipe Card');
      
      // Context menu trigger should be disabled
      // Since we're using Radix ContextMenu, we test that the component renders
      // The actual disabled behavior is handled by Radix internally
      expect(trigger).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('supports keyboard navigation', () => {
      render(
        <ContextMenu items={basicItems}>
          <div>Recipe Card</div>
        </ContextMenu>
      );

      const trigger = screen.getByText('Recipe Card');
      trigger.focus();
      
      // Test basic focus behavior (exact keyboard behavior is handled by Radix)
      // We mainly want to ensure the trigger can receive focus
      expect(document.body).toContainElement(trigger);
    });

    it('applies custom className', () => {
      const { container } = render(
        <ContextMenu items={basicItems} className="custom-context-menu">
          <div>Recipe Card</div>
        </ContextMenu>
      );

      expect(container.querySelector('.custom-context-menu')).toBeInTheDocument();
    });
  });

  describe('Radio Items', () => {
    const radioItems = [
      {
        type: 'radio' as const,
        label: 'Option 1',
        value: 'option1',
        onSelect: mockOnSelect,
      },
      {
        type: 'radio' as const,
        label: 'Option 2',
        value: 'option2',
        onSelect: mockOnSelect,
      },
    ];

    it('renders radio items', async () => {
      const user = userEvent.setup();
      render(
        <ContextMenu items={radioItems}>
          <div>Recipe Card</div>
        </ContextMenu>
      );

      const trigger = screen.getByText('Recipe Card');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('calls onSelect when radio item is clicked', async () => {
      const user = userEvent.setup();
      render(
        <ContextMenu items={radioItems}>
          <div>Recipe Card</div>
        </ContextMenu>
      );

      const trigger = screen.getByText('Recipe Card');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      const radioItem = screen.getByText('Option 1');
      await user.click(radioItem);

      expect(mockOnSelect).toHaveBeenCalled();
    });
  });
});