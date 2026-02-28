import React from 'react'
import Data from '../Backend/Data.json'

import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    Data: Data,
}
const DataSlice = createSlice({
    name: "Data",
    initialState, 
    reducers: {
        AddUser: (state, action) => {
            state.Data.user.push(action.payload)
        },
        AddVideo: (state, action) => {    
            state.Data.video.push(action.payload)
        },
    }
})  
export const { AddUser, AddVideo } = DataSlice.actions
export default DataSlice.reducer