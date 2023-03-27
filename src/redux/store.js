import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './sliceReducers/index';

const store = configureStore({
    reducer:reducer
})
export default store;