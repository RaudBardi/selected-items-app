export interface SelectionConfig {
    maxItems: number;
    allowMultiple: boolean;
}

export const SELECTION_CONFIGS = {
    USER_ITEMS: {
        maxItems: 6,
        allowMultiple: true
    },
    AVAILABLE_ITEMS: {
        maxItems: 1,
        allowMultiple: false
    }
} as const;

export const UI_TEXT = {
    USER_ITEMS_TITLE: "Вещи пользователя",
    AVAILABLE_ITEMS_TITLE: "Вещи на выбор",
    SELECTED_ITEMS_TITLE: "Выбранные вещи",
    SELECTED_ITEM_TITLE: "Выбранная вещь",
    RESET_BUTTON: "Очистить"
} as const; 