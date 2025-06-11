import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface Item {
    id: number;
    name: string;
}

const selectedUserItemMax = 6;

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
    const toggleUserItem = (item: Item) => {
        const index = selectedUserItems.value.findIndex(i => i.id === item.id);
        if (index >= 0) {
            selectedUserItems.value.splice(index, 1);
        } else if (selectedUserItems.value.length < selectedUserItemMax) {
            selectedUserItems.value.push(item);
        }
    };

    const setAvailableItem = (item: Item) => {
        selectedAvailableItem.value = item;
    };

    const resetSelectedItems = () => {
        selectedUserItems.value = [];
        selectedAvailableItem.value = null;
    };

    // Getters (computed properties)
    const hasSelectedItems = computed(() => selectedUserItems.value.length > 0);
    const canSelectMore = computed(() => selectedUserItems.value.length < selectedUserItemMax);
    const selectedItemsLeft = computed(() => `${selectedUserItems.value.length} / ${selectedUserItemMax}`);

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

        // Getters
        hasSelectedItems,
        canSelectMore,
        selectedItemsLeft
    };
}, {
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'items_state',
                storage: localStorage,
                paths: ['selectedUserItems', 'selectedAvailableItem'],
                serializer: {
                    serialize: JSON.stringify,
                    deserialize: JSON.parse
                }
            }
        ]
    }
});
