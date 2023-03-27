import {createAsyncThunk , createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getEmpIdData = createAsyncThunk('empData/showData',async ({ value,DataType })=>{
     
    return axios.get(`https://jsonplaceholder.typicode.com/posts/?${DataType}=${value}`)
    .then(res => {
        if(res.status === 200){
            console.log(res.data)
            return res.data
        }
    })
    .catch(err => console.error(err))

})
const initialState = {
    EmployeeData:[]
}
const getEmpIdDataReducer = createSlice({
    name:'empData',
    initialState,
    extraReducers:{
        [getEmpIdData.fulfilled]:(state,action)=>{
            state.EmployeeData = action.payload;
        },
    }
})
export default getEmpIdDataReducer.reducer;