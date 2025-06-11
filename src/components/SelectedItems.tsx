import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Item } from '@/stores/items'
import styles from './SelectedItems.module.css'

export default defineComponent({
    name: 'SelectedItems',
    props: {
        title: {
            type: String,
            required: true
        },
        items: {
            type: Array as PropType<Item[]>,
            required: true
        }
    },
    setup(props) {
        return () => (
            <div class={styles.container}>
                <h3 class={styles.title}>{props.title}</h3>
                <div class={styles.items}>
                    {props.items.map(item => (
                        <div key={item.id} class={styles.item}>
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
})
