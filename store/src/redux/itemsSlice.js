import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
    name: 'items',
    initialState: [
        { id: 1, name: 'I just', description: 'breaking news' },
        { id: 2, name: 'Picked something', description: 'they tryna kill him' },
        { id: 3, name: 'from my', description: 'but the boy prevails' },
        { id: 4, name: 'linking up', description: 'w crodie who dont fw me' },
    ],
    reducers: {
        addItem: (state, action) => {
            const newItem = { ...action.payload, id: state.length + 1 };
            state.push(newItem);
        },
    },
});

export const { addItem } = itemsSlice.actions;

export default itemsSlice.reducer;
