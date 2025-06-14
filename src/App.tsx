import { defineComponent } from 'vue'
import TopSection from './components/TopSection'
import BottomSection from './components/BottomSection'
import styles from './App.module.css'
import { useItemsStore } from './stores/items';

export default defineComponent({
    name: 'App',
    components: {
        TopSection,
        BottomSection
    },
    setup() {
        const store = useItemsStore();

        const handleReset = () => {
            store.resetSelectedItems();
        };

        return () => (
            <div class={styles.app}>
                <div>
                    <div onClick={handleReset}>Очистить</div>
                </div>
                <TopSection />
                <BottomSection />
            </div>
        )
    }
})
