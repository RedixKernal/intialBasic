import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    employeeID:{}
}
const searchEmployeeIDReducer = createSlice({
    name:'getEmpID',
    initialState,
    reducers:{
        searchEmployeeID:(state,action) =>{
             state.employeeID = action.payload;
        }
    }
})
 export const {searchEmployeeID} = searchEmployeeIDReducer.actions;
export default searchEmployeeIDReducer.reducer;