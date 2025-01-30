// reducers/post-ui-reducer.ts
type State = {
    isPickerOpen: boolean;
    isGifPickerOpen: boolean;
    gifs: any[];
    gifSearch: string;
    selectedGif: any | null;
};

type Action =
    | { type: "TOGGLE_PICKER" }
    | { type: "TOGGLE_GIF_PICKER" }
    | { type: "SET_GIFS"; payload: any[] }
    | { type: "SET_GIF_SEARCH"; payload: string }
    | { type: "SELECT_GIF"; payload: any }
    | { type: "CLEAR_GIF" };

export const initialState: State = {
    isPickerOpen: false,
    isGifPickerOpen: false,
    gifs: [],
    gifSearch: "",
    selectedGif: null,
};

export function uiReducer(state: State, action: Action): State {
    switch (action.type) {
        case "TOGGLE_PICKER":
            return {
                ...state,
                isPickerOpen: !state.isPickerOpen,
                isGifPickerOpen: false,
            };
        case "TOGGLE_GIF_PICKER":
            return {
                ...state,
                isGifPickerOpen: !state.isGifPickerOpen,
                isPickerOpen: false,
            };
        case "SET_GIFS":
            return { ...state, gifs: action.payload };
        case "SET_GIF_SEARCH":
            return { ...state, gifSearch: action.payload };
        case "SELECT_GIF":
            return {
                ...state,
                selectedGif: action.payload,
                isGifPickerOpen: false,
            };
        case "CLEAR_GIF":
            return { ...state, selectedGif: null };
        default:
            return state;
    }
}
