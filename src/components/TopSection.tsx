import { defineComponent } from 'vue'
import { useItemsStore } from '@/stores/items'
import { UI_TEXT } from '@/constants/selection'
import SelectedItems from './SelectedItems'
import styles from './TopSection.module.css'

export default defineComponent({
    name: 'TopSection',
    components: {
        SelectedItems
    },
    setup() {
        const store = useItemsStore()



        return () => (
            <div class={styles.section}>
                <div class={styles.left}>
                    <SelectedItems
                        title={`${UI_TEXT.SELECTED_ITEMS_TITLE}: ${store.selectedItemsLeft}`}
                        items={store.selectedUserItems}
                    />
                </div>
                <div class={styles.right}>
                    <SelectedItems
                        title={UI_TEXT.SELECTED_ITEM_TITLE}
                        items={store.selectedAvailableItems}
                    />
                </div>
            </div>
        )
    }
})
