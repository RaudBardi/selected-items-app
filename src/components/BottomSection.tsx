import { defineComponent } from 'vue'
import { useItemsStore } from '@/stores/items'
import ItemList from './ItemList'
import styles from './BottomSection.module.css'

export default defineComponent({
    name: 'BottomSection',
    components: {
        ItemList
    },
    setup() {
        const store = useItemsStore()

        return () => (
            <div class={styles.section}>
                <div class={styles.left}>
                    <ItemList
                        title="Вещи у пользователя"
                        items={store.userItems}
                        selectedItems={store.selectedUserItems}
                        maxSelection={6}
                        onSelect={store.toggleUserItem}
                    />
                </div>
                <div class={styles.right}>
                    <ItemList
                        title="Вещи на выбор"
                        items={store.availableItems}
                        selectedItems={
                            store.selectedAvailableItem
                                ? [store.selectedAvailableItem]
                                : []
                        }
                        singleSelection={true}
                        onSelect={store.setAvailableItem}
                    />
                </div>
            </div>
        )
    }
})
