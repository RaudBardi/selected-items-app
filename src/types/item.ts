export interface Item {
    id: number;
    name: string;
}

export interface ItemListConfig {
    title: string;
    items: Item[];
    selectedItems: Item[];
    maxSelection?: number;
    singleSelection?: boolean;
    onSelect: (item: Item) => void;
}

export interface SelectedItemsProps {
    title: string;
    items: Item[];
} 