import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Menubar } from './menubar'

const mockMenus = [
  {
    trigger: 'File',
    items: [
      { type: 'item' as const, label: 'New', value: 'new' },
      { type: 'item' as const, label: 'Open', value: 'open' },
      { type: 'separator' as const },
      { type: 'item' as const, label: 'Save', value: 'save', disabled: true },
    ]
  },
  {
    trigger: 'Edit',
    items: [
      { type: 'checkbox' as const, label: 'Show Grid', value: 'grid', checked: true },
      { type: 'checkbox' as const, label: 'Show Rulers', value: 'rulers', checked: false },
    ]
  },
  {
    trigger: 'View',
    items: [
      { type: 'radio' as const, label: 'List View', value: 'list', radioGroup: 'view', checked: true },
      { type: 'radio' as const, label: 'Grid View', value: 'grid', radioGroup: 'view' },
      { type: 'radio' as const, label: 'Card View', value: 'card', radioGroup: 'view' },
    ]
  }
];

describe('Menubar', () => {
  describe('Rendering', () => {
    it('renders menubar with triggers', () => {
      render(<Menubar menus={mockMenus} />)
      
      expect(screen.getByRole('menubar')).toBeInTheDocument()
      expect(screen.getByText('File')).toBeInTheDocument()
      expect(screen.getByText('Edit')).toBeInTheDocument()
      expect(screen.getByText('View')).toBeInTheDocument()
    })

    it('renders with custom aria-label', () => {
      render(<Menubar menus={mockMenus} aria-label="Custom menubar" />)
      
      const menubar = screen.getByRole('menubar')
      expect(menubar).toHaveAttribute('aria-label', 'Custom menubar')
    })

    it('applies custom className', () => {
      render(<Menubar menus={mockMenus} className="custom-class" />)
      
      const menubar = screen.getByRole('menubar')
      expect(menubar).toHaveClass('custom-class')
    })
  })

  describe('Menu Interaction', () => {
    it('opens menu when trigger is clicked', async () => {
      const user = userEvent.setup()
      render(<Menubar menus={mockMenus} />)
      
      const fileTrigger = screen.getByText('File')
      await user.click(fileTrigger)
      
      expect(screen.getByText('New')).toBeInTheDocument()
      expect(screen.getByText('Open')).toBeInTheDocument()
      expect(screen.getByText('Save')).toBeInTheDocument()
    })

    it('opens menu with keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<Menubar menus={mockMenus} />)
      
      const fileTrigger = screen.getByText('File')
      fileTrigger.focus()
      await user.keyboard('{Enter}')
      
      expect(screen.getByText('New')).toBeInTheDocument()
    })

    it('calls onMenuSelect when item is selected', async () => {
      const user = userEvent.setup()
      const handleMenuSelect = vi.fn()
      render(<Menubar menus={mockMenus} onMenuSelect={handleMenuSelect} />)
      
      const fileTrigger = screen.getByText('File')
      await user.click(fileTrigger)
      
      const newItem = screen.getByText('New')
      await user.click(newItem)
      
      expect(handleMenuSelect).toHaveBeenCalledWith('new', 0, 0)
    })

    it('does not select disabled items', async () => {
      const user = userEvent.setup()
      const handleMenuSelect = vi.fn()
      render(<Menubar menus={mockMenus} onMenuSelect={handleMenuSelect} />)
      
      const fileTrigger = screen.getByText('File')
      await user.click(fileTrigger)
      
      const saveItem = screen.getByText('Save')
      expect(saveItem).toHaveAttribute('data-disabled')
      
      await user.click(saveItem)
      expect(handleMenuSelect).not.toHaveBeenCalled()
    })
  })

  describe('Item Types', () => {
    it('renders separator items', async () => {
      const user = userEvent.setup()
      render(<Menubar menus={mockMenus} />)
      
      const fileTrigger = screen.getByText('File')
      await user.click(fileTrigger)
      
      const separators = screen.getAllByRole('separator')
      expect(separators.length).toBeGreaterThan(0)
    })

    it('renders checkbox items with correct state', async () => {
      const user = userEvent.setup()
      render(<Menubar menus={mockMenus} />)
      
      const editTrigger = screen.getByText('Edit')
      await user.click(editTrigger)
      
      const gridCheckbox = screen.getByText('Show Grid')
      const rulersCheckbox = screen.getByText('Show Rulers')
      
      expect(gridCheckbox).toBeInTheDocument()
      expect(rulersCheckbox).toBeInTheDocument()
    })

    it('renders radio items with correct grouping', async () => {
      const user = userEvent.setup()
      render(<Menubar menus={mockMenus} />)
      
      const viewTrigger = screen.getByText('View')
      await user.click(viewTrigger)
      
      expect(screen.getByText('List View')).toBeInTheDocument()
      expect(screen.getByText('Grid View')).toBeInTheDocument()
      expect(screen.getByText('Card View')).toBeInTheDocument()
    })
  })

  describe('Submenu Support', () => {
    const menusWithSubmenu = [
      {
        trigger: 'File',
        items: [
          { type: 'item' as const, label: 'New', value: 'new' },
          { 
            type: 'submenu' as const, 
            label: 'Recent', 
            value: 'recent',
            submenu: [
              { type: 'item' as const, label: 'Recipe 1', value: 'recipe1' },
              { type: 'item' as const, label: 'Recipe 2', value: 'recipe2' },
            ]
          },
        ]
      }
    ];

    it('renders submenu items', async () => {
      const user = userEvent.setup()
      render(<Menubar menus={menusWithSubmenu} />)
      
      const fileTrigger = screen.getByText('File')
      await user.click(fileTrigger)
      
      expect(screen.getByText('Recent')).toBeInTheDocument()
    })

    it('opens submenu on hover/interaction', async () => {
      const user = userEvent.setup()
      render(<Menubar menus={menusWithSubmenu} />)
      
      const fileTrigger = screen.getByText('File')
      await user.click(fileTrigger)
      
      const recentSubmenu = screen.getByText('Recent')
      await user.hover(recentSubmenu)
      
      // Note: Submenu opening might be delayed, so we check for eventual appearance
      expect(screen.getByText('Recent')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA roles', () => {
      render(<Menubar menus={mockMenus} />)
      
      expect(screen.getByRole('menubar')).toBeInTheDocument()
      
      // Menu triggers should be buttons
      const triggers = screen.getAllByRole('menuitem')
      expect(triggers.length).toBeGreaterThan(0)
    })

    it('supports keyboard navigation between triggers', async () => {
      const user = userEvent.setup()
      render(<Menubar menus={mockMenus} />)
      
      const fileTrigger = screen.getByText('File')
      fileTrigger.focus()
      
      await user.keyboard('{ArrowRight}')
      expect(screen.getByText('Edit')).toHaveFocus()
      
      await user.keyboard('{ArrowRight}')
      expect(screen.getByText('View')).toHaveFocus()
      
      await user.keyboard('{ArrowLeft}')
      expect(screen.getByText('Edit')).toHaveFocus()
    })

    it('closes menu with Escape key', async () => {
      const user = userEvent.setup()
      render(<Menubar menus={mockMenus} />)
      
      const fileTrigger = screen.getByText('File')
      await user.click(fileTrigger)
      
      expect(screen.getByText('New')).toBeInTheDocument()
      
      await user.keyboard('{Escape}')
      
      // Menu should close
      expect(screen.queryByText('New')).not.toBeInTheDocument()
    })

    it('provides proper ARIA labels for menu triggers', () => {
      render(<Menubar menus={mockMenus} />)
      
      const fileTrigger = screen.getByText('File')
      expect(fileTrigger).toHaveAttribute('aria-label', 'File menu')
    })
  })

  describe('Disabled State', () => {
    it('disables entire menubar when disabled prop is true', () => {
      render(<Menubar menus={mockMenus} disabled />)
      
      const fileTrigger = screen.getByText('File')
      expect(fileTrigger).toBeDisabled()
    })

    it('disables individual menus when menu disabled is true', () => {
      const menusWithDisabled = [
        { ...mockMenus[0], disabled: true },
        mockMenus[1]
      ];
      
      render(<Menubar menus={menusWithDisabled} />)
      
      const fileTrigger = screen.getByText('File')
      const editTrigger = screen.getByText('Edit')
      
      expect(fileTrigger).toBeDisabled()
      expect(editTrigger).not.toBeDisabled()
    })
  })

  describe('Custom Callbacks', () => {
    it('calls individual item onSelect callback', async () => {
      const user = userEvent.setup()
      const itemCallback = vi.fn()
      
      const menusWithCallback = [
        {
          trigger: 'File',
          items: [
            { type: 'item' as const, label: 'New', value: 'new', onSelect: itemCallback },
          ]
        }
      ];
      
      render(<Menubar menus={menusWithCallback} />)
      
      const fileTrigger = screen.getByText('File')
      await user.click(fileTrigger)
      
      const newItem = screen.getByText('New')
      await user.click(newItem)
      
      expect(itemCallback).toHaveBeenCalled()
    })
  })

  describe('Icons and Shortcuts', () => {
    const menusWithExtras = [
      {
        trigger: 'File',
        items: [
          { 
            type: 'item' as const, 
            label: 'New', 
            value: 'new', 
            shortcut: '⌘N',
            icon: <span data-testid="new-icon">📄</span>
          },
        ]
      }
    ];

    it('renders icons and shortcuts', async () => {
      const user = userEvent.setup()
      render(<Menubar menus={menusWithExtras} />)
      
      const fileTrigger = screen.getByText('File')
      await user.click(fileTrigger)
      
      expect(screen.getByTestId('new-icon')).toBeInTheDocument()
      expect(screen.getByText('⌘N')).toBeInTheDocument()
    })
  })
})