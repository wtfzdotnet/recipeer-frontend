import React from 'react';
import {
  Menubar as ShadcnMenubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarSub,
  MenubarShortcut,
} from '@/components/ui/menubar';
import { cn } from '@/lib/utils';

export interface MenubarProps {
  /** Menu items configuration */
  menus: MenuConfig[];
  /** Custom CSS class */
  className?: string;
  /** Whether the menubar is disabled */
  disabled?: boolean;
  /** ARIA label for the menubar */
  'aria-label'?: string;
  /** Callback when menu item is selected */
  onMenuSelect?: (value: string, menuIndex: number, itemIndex: number) => void;
}

export interface MenuConfig {
  /** Menu trigger label */
  trigger: string;
  /** Menu items */
  items: MenuItem[];
  /** Whether this menu is disabled */
  disabled?: boolean;
}

export interface MenuItem {
  /** Item type */
  type?: 'item' | 'checkbox' | 'radio' | 'separator' | 'label' | 'submenu';
  /** Item label */
  label?: string;
  /** Item value for callbacks */
  value?: string;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Whether item is checked (for checkbox/radio) */
  checked?: boolean;
  /** Keyboard shortcut display */
  shortcut?: string;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Submenu items (for submenu type) */
  submenu?: MenuItem[];
  /** Radio group name (for radio type) */
  radioGroup?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Callback for this specific item */
  onSelect?: () => void;
}

/**
 * Menubar component for accessible application-style navigation
 * Built for professional chef interfaces and advanced user navigation
 */
export const Menubar: React.FC<MenubarProps> = ({
  menus,
  className,
  disabled = false,
  'aria-label': ariaLabel = 'Main menu bar',
  onMenuSelect,
  ...props
}) => {
  const handleItemSelect = (value: string, menuIndex: number, itemIndex: number) => {
    onMenuSelect?.(value, menuIndex, itemIndex);
  };

  const renderMenuItem = (item: MenuItem, menuIndex: number, itemIndex: number) => {
    const key = `${menuIndex}-${itemIndex}-${item.value || item.label}`;

    switch (item.type) {
      case 'separator':
        return <MenubarSeparator key={key} />;

      case 'label':
        return (
          <MenubarLabel key={key} aria-label={item['aria-label']}>
            {item.label}
          </MenubarLabel>
        );

      case 'checkbox':
        return (
          <MenubarCheckboxItem
            key={key}
            checked={item.checked}
            disabled={item.disabled}
            aria-label={item['aria-label']}
            onSelect={() => {
              item.onSelect?.();
              if (item.value) {
                handleItemSelect(item.value, menuIndex, itemIndex);
              }
            }}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
            {item.shortcut && <MenubarShortcut>{item.shortcut}</MenubarShortcut>}
          </MenubarCheckboxItem>
        );

      case 'radio':
        return (
          <MenubarRadioItem
            key={key}
            value={item.value || item.label || ''}
            disabled={item.disabled}
            aria-label={item['aria-label']}
            onSelect={() => {
              item.onSelect?.();
              if (item.value) {
                handleItemSelect(item.value, menuIndex, itemIndex);
              }
            }}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
            {item.shortcut && <MenubarShortcut>{item.shortcut}</MenubarShortcut>}
          </MenubarRadioItem>
        );

      case 'submenu':
        return (
          <MenubarSub key={key}>
            <MenubarSubTrigger
              disabled={item.disabled}
              aria-label={item['aria-label']}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </MenubarSubTrigger>
            <MenubarSubContent>
              {item.submenu?.map((subItem, subIndex) =>
                renderMenuItem(subItem, menuIndex, subIndex)
              )}
            </MenubarSubContent>
          </MenubarSub>
        );

      default:
        return (
          <MenubarItem
            key={key}
            disabled={item.disabled}
            aria-label={item['aria-label']}
            onSelect={() => {
              item.onSelect?.();
              if (item.value) {
                handleItemSelect(item.value, menuIndex, itemIndex);
              }
            }}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
            {item.shortcut && <MenubarShortcut>{item.shortcut}</MenubarShortcut>}
          </MenubarItem>
        );
    }
  };

  const renderRadioGroups = (items: MenuItem[]) => {
    const radioGroups: { [key: string]: MenuItem[] } = {};
    const nonRadioItems: MenuItem[] = [];

    items.forEach(item => {
      if (item.type === 'radio' && item.radioGroup) {
        if (!radioGroups[item.radioGroup]) {
          radioGroups[item.radioGroup] = [];
        }
        radioGroups[item.radioGroup].push(item);
      } else {
        nonRadioItems.push(item);
      }
    });

    const result: React.ReactNode[] = [];

    // Add non-radio items first
    nonRadioItems.forEach((item, index) => {
      result.push(renderMenuItem(item, 0, index));
    });

    // Add radio groups
    Object.entries(radioGroups).forEach(([groupName, groupItems]) => {
      result.push(
        <MenubarRadioGroup key={groupName} value="">
          {groupItems.map((item, index) => renderMenuItem(item, 0, index))}
        </MenubarRadioGroup>
      );
    });

    return result;
  };

  return (
    <ShadcnMenubar
      className={cn(className)}
      aria-label={ariaLabel}
      {...props}
    >
      {menus.map((menu, menuIndex) => (
        <MenubarMenu key={menuIndex}>
          <MenubarTrigger
            disabled={disabled || menu.disabled}
            aria-label={`${menu.trigger} menu`}
          >
            {menu.trigger}
          </MenubarTrigger>
          <MenubarContent>
            {menu.items.some(item => item.type === 'radio')
              ? renderRadioGroups(menu.items)
              : menu.items.map((item, itemIndex) =>
                  renderMenuItem(item, menuIndex, itemIndex)
                )}
          </MenubarContent>
        </MenubarMenu>
      ))}
    </ShadcnMenubar>
  );
};

export default Menubar;