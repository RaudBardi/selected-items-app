import type { Item } from '@/types/item';
import type { SelectionConfig } from '@/constants/selection';

/**
 * Validates if a new item can be selected based on current selection and config
 */
export const validateSelection = (currentSelection: Item[], _newItem: Item, config: SelectionConfig): boolean => {
    if (config.allowMultiple) {
        return currentSelection.length < config.maxItems;
    }
    return currentSelection.length === 0;
};

/**
 * Checks if an item is already selected in a list of selected items
 */
export const isItemSelected = (item: Item, selectedItems: Item[]): boolean => {
    return selectedItems.some(selected => selected.id === item.id);
};

/**
 * Removes an item from a list by its ID
 */
export const removeItemById = (items: Item[], itemId: number): Item[] => {
    return items.filter(item => item.id !== itemId);
};

/**
 * Finds an item in a list by its ID
 */
export const findItemById = (items: Item[], itemId: number): Item | undefined => {
    return items.find(item => item.id === itemId);
};

/**
 * Creates a formatted string showing selection count
 */
export const formatSelectionCount = (current: number, max: number): string => {
    return `${current} / ${max}`;
}; 