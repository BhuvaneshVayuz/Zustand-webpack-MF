import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import itemsReducer from './itemsSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        items: itemsReducer,
        user: userReducer,
        data: dataReducer
    },
});

export default store;
