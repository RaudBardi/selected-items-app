import { defineComponent, computed } from 'vue'
import { useItemsStore } from '@/stores/items'
import { UI_TEXT } from '@/constants/selection'
import ItemList from './ItemList'
import styles from './BottomSection.module.css'

export default defineComponent({
    name: 'BottomSection',
    components: {
        ItemList
    },
    setup() {
        const store = useItemsStore()

        // Computed properties for better performance and readability
        const userItemsConfig = computed(() => ({
            title: UI_TEXT.USER_ITEMS_TITLE,
            items: store.userItems,
            selectedItems: store.selectedUserItems,
            maxSelection: store.maxUserItems,
            onSelect: store.toggleUserItem
        }))

        const availableItemsConfig = computed(() => ({
            title: UI_TEXT.AVAILABLE_ITEMS_TITLE,
            items: store.availableItems,
            selectedItems: store.selectedAvailableItems,
            singleSelection: true,
            onSelect: store.setAvailableItem
        }))

        return () => (
            <div class={styles.section}>
                <div class={styles.left}>
                    <ItemList {...userItemsConfig.value} />
                </div>
                <div class={styles.right}>
                    <ItemList {...availableItemsConfig.value} />
                </div>
            </div>
        )
    }
})
