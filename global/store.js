import { configureStore } from "@reduxjs/toolkit";
import eventSlice from '../reducers/eventReducer'

const store = configureStore({
    reducer: {
        'event': eventSlice,
    }
});

export default store;