import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { SELECTION_CONFIGS } from '@/constants/selection';
import { validateSelection, isItemSelected, formatSelectionCount } from '@/utils/itemUtils';
import type { Item } from '@/types/item';



export const useItemsStore = defineStore('items', () => {
    // State
    const userItems = ref<Item[]>([
        { id: 1, name: 'Shoes 1' },
        { id: 2, name: 'Shoes 2' },
        { id: 3, name: 'Shoes 3' },
        { id: 4, name: 'Shoes 4' },
        { id: 5, name: 'T-shirt 1' },
        { id: 6, name: 'T-shirt 2' },
        { id: 7, name: 'T-shirt 3' },
        { id: 8, name: 'T-shirt 4' }
    ]);

    const availableItems = ref<Item[]>([
        { id: 11, name: 'Jacket 1' },
        { id: 12, name: 'Jacket 2' },
        { id: 13, name: 'Jacket 3' },
        { id: 14, name: 'Jacket 4' },
        { id: 15, name: 'Hoodie 1' },
        { id: 16, name: 'Hoodie 2' },
        { id: 17, name: 'Hoodie 3' },
        { id: 18, name: 'Hoodie 4' }
    ]);

    const selectedUserItems = ref<Item[]>([]);
    const selectedAvailableItem = ref<Item | null>(null);

    // Actions
    const toggleUserItem = (item: Item): void => {
        const config = SELECTION_CONFIGS.USER_ITEMS;
        
        if (isItemSelected(item, selectedUserItems.value)) {
            // Remove item if already selected
            const index = selectedUserItems.value.findIndex(i => i.id === item.id);
            selectedUserItems.value.splice(index, 1);
        } else if (validateSelection(selectedUserItems.value, item, config)) {
            // Add item if selection limit not reached
            selectedUserItems.value.push(item);
        }
    };

    const setAvailableItem = (item: Item): void => {
        const config = SELECTION_CONFIGS.AVAILABLE_ITEMS;
        
        if (isItemSelected(item, selectedAvailableItem.value ? [selectedAvailableItem.value] : [])) {
            // Deselect if already selected
            selectedAvailableItem.value = null;
        } else if (validateSelection(selectedAvailableItem.value ? [selectedAvailableItem.value] : [], item, config)) {
            // Select new item
            selectedAvailableItem.value = item;
        }
    };

    const resetSelectedItems = (): void => {
        selectedUserItems.value = [];
        selectedAvailableItem.value = null;
    };

    const removeUserItem = (itemId: number): void => {
        const index = selectedUserItems.value.findIndex(item => item.id === itemId);
        if (index >= 0) {
            selectedUserItems.value.splice(index, 1);
        }
    };

    const clearAvailableSelection = (): void => {
        selectedAvailableItem.value = null;
    };

    // Getters (computed properties)
    const hasSelectedItems = computed(() => 
        selectedUserItems.value.length > 0 || selectedAvailableItem.value !== null
    );

    const hasSelectedUserItems = computed(() => selectedUserItems.value.length > 0);
    
    const hasSelectedAvailableItem = computed(() => selectedAvailableItem.value !== null);

    const canSelectMoreUserItems = computed(() => 
        selectedUserItems.value.length < SELECTION_CONFIGS.USER_ITEMS.maxItems
    );

    const selectedUserItemsCount = computed(() => selectedUserItems.value.length);
    
    const maxUserItems = computed(() => SELECTION_CONFIGS.USER_ITEMS.maxItems);
    
    const selectedItemsLeft = computed(() => 
        formatSelectionCount(selectedUserItems.value.length, SELECTION_CONFIGS.USER_ITEMS.maxItems)
    );

    const selectedAvailableItems = computed(() => 
        selectedAvailableItem.value ? [selectedAvailableItem.value] : []
    );

    return {
        // State
        userItems,
        availableItems,
        selectedUserItems,
        selectedAvailableItem,

        // Actions
        toggleUserItem,
        setAvailableItem,
        resetSelectedItems,
        removeUserItem,
        clearAvailableSelection,

        // Getters
        hasSelectedItems,
        hasSelectedUserItems,
        hasSelectedAvailableItem,
        canSelectMoreUserItems,
        selectedUserItemsCount,
        maxUserItems,
        selectedItemsLeft,
        selectedAvailableItems
    };
}, {
    persist: true,
});


