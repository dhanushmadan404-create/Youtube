import {configureStore} from '@reduxjs/toolkit'
import DataSlice from "./Slice/CreateSlice";
import videoSlice from "./Slice/VIdeoSlice"
import userSlice from "./Slice/UserSlice"
import FollowerSlice from "./Slice/FollowerSlice"
import LikesSlice from "./Slice/LikesSlice"
import ReviewSlice from "./Slice/ReviewSlice"
import viewSlice from "./Slice/ViewSlice"
const Store = configureStore({  
    reducer: {
        Data: DataSlice,
        video:videoSlice,
        user:userSlice,
        followers:FollowerSlice,
        likes:LikesSlice,
        review:ReviewSlice,
        view:viewSlice
    }
})
export default Store