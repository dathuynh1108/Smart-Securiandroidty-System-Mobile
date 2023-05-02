import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    eventsList: [],
    originalEventsList: [],
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        getOriginalEventsList(state, action) {
            return state.originalEventsList;
        },

        updateOriginalEventsList(state, action) {
            const newOriginalEventsList = action.payload;
            state.originalEventsList = newOriginalEventsList;
        },

        getEventsList(state, action) {
            const newEventsList = action.payload;
            state.eventsList = newEventsList;
        },

        updateConfirmStatusEvent(state, action) {
            let currentEvents = state.eventsList;
            console.log("action.payload confirm status: ", action.payload);
            currentEvents = currentEvents.map((event, idx) => {
                if (event.id == action.payload.id || event._id == action.payload.id) {
                    event.event_status = "human_verified";
                    return event;
                } else {
                    return event;
                }
            })
            state.eventsList = currentEvents;
        },

        updateCommentEvent(state, action) {
            let currentEvents = state.eventsList;
            console.log("action.payload comment: ", action.payload);
            currentEvents = currentEvents.map((event, idx) => {
                if (event.id == action.payload.id || event._id == action.payload.id) {
                    event.comment = action.payload.comment;
                    return event;
                } else {
                    return event;
                }
            })
            state.eventsList = currentEvents;
        }
    }
})

export const {
    getEventsList,
    updateConfirmStatusEvent,
    getOriginalEventsList,
    updateOriginalEventsList,
    updateCommentEvent,
}
    = eventSlice.actions;

export default eventSlice.reducer;