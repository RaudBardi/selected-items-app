import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Item } from '@/types/item'
import styles from './ItemList.module.css'

export default defineComponent({
    name: 'ItemList',
    props: {
        title: {
            type: String,
            required: true
        },
        items: {
            type: Array as PropType<Item[]>,
            required: true
        },
        selectedItems: {
            type: Array as PropType<Item[]>,
            default: () => []
        },
        maxSelection: Number,
        singleSelection: Boolean
    },
    emits: ['select'],
    setup(props, { emit }) {
        const handleSelect = (item: Item) => {
            emit('select', item)
        }

        return () => (
            <div class={styles.container}>
                <h3 class={styles.title}>{props.title}</h3>

                <div class={styles.list}>
                    {props.items.map(item => (
                        <div
                            key={item.id}
                            class={[
                                styles.item,
                                props.selectedItems.some(i => i.id === item.id) ? styles.selected : ''
                            ]}
                            onClick={() => handleSelect(item)}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
})
