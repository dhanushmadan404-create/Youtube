import ConfigureStore from "./ConfigureStore";
import DataSlice from "./CreateSlice";

const Store = ConfigureStore({  
    reducer: {
        Data: DataSlice,
    }
})
export default Store