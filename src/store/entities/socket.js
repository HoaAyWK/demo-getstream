import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    socket: null
};


const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocket: (state, action) => {
            state.socket = action.payload;
        }
    }
});


const { actions, reducer } = socketSlice;

export const { setSocket } = actions;

export default reducer;
