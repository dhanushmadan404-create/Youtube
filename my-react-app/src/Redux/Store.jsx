import {configureStore} from '@reduxjs/toolkit'
import DataSlice from "./CreateSlice";
const Store = configureStore({  
    reducer: {
        Data: DataSlice,
    }
})
export default Store