import { computed, defineComponent } from 'vue'
import { useItemsStore } from '@/stores/items'
import SelectedItems from './SelectedItems'
import styles from './TopSection.module.css'

export default defineComponent({
    name: 'TopSection',
    components: {
        SelectedItems
    },
    setup() {
        const store = useItemsStore()

        const selectedAvailableItems = computed(() => {
            return store.selectedAvailableItem
                ? [store.selectedAvailableItem] : []
        })

        return () => (
            <div class={styles.section}>
                <div class={styles.left}>
                    <SelectedItems
                        title={`Выбранные вещи: ${store.selectedItemsLeft}`}
                        items={store.selectedUserItems}
                    />
                </div>
                <div class={styles.right}>
                    <SelectedItems
                        title="Выбранная вещь"
                        items={selectedAvailableItems.value}
                    />
                </div>
            </div>
        )
    }
})
