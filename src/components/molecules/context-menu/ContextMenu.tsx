import React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ContextMenuProps {
  /** Content that triggers the context menu */
  children: React.ReactNode;
  /** Menu items */
  items: ContextMenuItem[];
  /** Additional CSS classes */
  className?: string;
  /** Whether the menu is disabled */
  disabled?: boolean;
}

export interface ContextMenuItem {
  type: 'item' | 'separator' | 'submenu' | 'checkbox' | 'radio';
  label?: string;
  value?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  checked?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  items?: ContextMenuItem[]; // For submenu
}

const ContextMenuRoot = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuContent = ContextMenuPrimitive.Content;
const ContextMenuSeparator = ContextMenuPrimitive.Separator;
const ContextMenuCheckboxItem = ContextMenuPrimitive.CheckboxItem;
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;
const ContextMenuRadioItem = ContextMenuPrimitive.RadioItem;
const ContextMenuSub = ContextMenuPrimitive.Sub;
const ContextMenuSubTrigger = ContextMenuPrimitive.SubTrigger;
const ContextMenuSubContent = ContextMenuPrimitive.SubContent;
const ContextMenuItemPrimitive = ContextMenuPrimitive.Item;
const ContextMenuItemIndicator = ContextMenuPrimitive.ItemIndicator;

/**
 * ContextMenu component for right-click actions on recipes and content
 * Provides accessible context-sensitive actions for recipe management
 */
export const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  items,
  className,
  disabled = false,
}) => {
  const renderMenuItem = (item: ContextMenuItem, index: number) => {
    switch (item.type) {
      case 'separator':
        return (
          <ContextMenuSeparator
            key={`separator-${index}`}
            className="h-px bg-border mx-1 my-1"
          />
        );

      case 'submenu':
        return (
          <ContextMenuSub key={item.value || `submenu-${index}`}>
            <ContextMenuSubTrigger
              className={cn(
                'flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
                'hover:bg-accent hover:text-accent-foreground',
                'focus:bg-accent focus:text-accent-foreground',
                'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                item.disabled && 'opacity-50 pointer-events-none'
              )}
              disabled={item.disabled}
            >
              {item.icon && <span className="h-4 w-4">{item.icon}</span>}
              <span className="flex-1">{item.label}</span>
              <ChevronRight className="h-3 w-3" />
            </ContextMenuSubTrigger>
            <ContextMenuSubContent
              className={cn(
                'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg',
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
                'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
                'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
              )}
            >
              {item.items?.map((subItem, subIndex) => renderMenuItem(subItem, subIndex))}
            </ContextMenuSubContent>
          </ContextMenuSub>
        );

      case 'checkbox':
        return (
          <ContextMenuCheckboxItem
            key={item.value || `checkbox-${index}`}
            className={cn(
              'flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
              'hover:bg-accent hover:text-accent-foreground',
              'focus:bg-accent focus:text-accent-foreground',
              'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
            )}
            checked={item.checked}
            onCheckedChange={item.onSelect}
            disabled={item.disabled}
          >
            <ContextMenuItemIndicator className="flex h-4 w-4 items-center justify-center">
              <Check className="h-3 w-3" />
            </ContextMenuItemIndicator>
            {item.icon && <span className="h-4 w-4">{item.icon}</span>}
            <span className="flex-1">{item.label}</span>
            {item.shortcut && (
              <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                {item.shortcut}
              </span>
            )}
          </ContextMenuCheckboxItem>
        );

      case 'radio':
        return (
          <ContextMenuRadioItem
            key={item.value || `radio-${index}`}
            value={item.value || ''}
            className={cn(
              'flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
              'hover:bg-accent hover:text-accent-foreground',
              'focus:bg-accent focus:text-accent-foreground',
              'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
            )}
            onSelect={item.onSelect}
            disabled={item.disabled}
          >
            <ContextMenuItemIndicator className="flex h-4 w-4 items-center justify-center">
              <Check className="h-3 w-3" />
            </ContextMenuItemIndicator>
            {item.icon && <span className="h-4 w-4">{item.icon}</span>}
            <span className="flex-1">{item.label}</span>
            {item.shortcut && (
              <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                {item.shortcut}
              </span>
            )}
          </ContextMenuRadioItem>
        );

      case 'item':
      default:
        return (
          <ContextMenuItemPrimitive
            key={item.value || `item-${index}`}
            className={cn(
              'flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
              'hover:bg-accent hover:text-accent-foreground',
              'focus:bg-accent focus:text-accent-foreground',
              'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
            )}
            onSelect={item.onSelect}
            disabled={item.disabled}
          >
            {item.icon && <span className="h-4 w-4">{item.icon}</span>}
            <span className="flex-1">{item.label}</span>
            {item.shortcut && (
              <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                {item.shortcut}
              </span>
            )}
          </ContextMenuItemPrimitive>
        );
    }
  };

  return (
    <ContextMenuRoot>
      <ContextMenuTrigger 
        className={cn('block', className)}
        disabled={disabled}
      >
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent
        className={cn(
          'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
        )}
        alignOffset={-5}
      >
        {items.map((item, index) => renderMenuItem(item, index))}
      </ContextMenuContent>
    </ContextMenuRoot>
  );
};

export default ContextMenu;