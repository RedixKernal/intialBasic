import {createAsyncThunk , createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getFormDataThunk = createAsyncThunk('formPost/formData', ()=>{
    return(
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res => {
            if(res.status === 200) return res.data;
        })
        .catch(err => console.error(err))
    )
})
const initialState = {
    statusReport:null,
    intialPost:[]
}
const formDataSlice = createSlice({
    name:'formPost',
    initialState,
    extraReducers:{
        [getFormDataThunk.pending]:(state,action)=>{
            state.statusReport = "_REQUEST_PENDING...";
        },
        [getFormDataThunk.fulfilled]:(state,action)=>{
            state.statusReport = "_SUCCESS...";
            state.intialPost = action.payload;
        },
        [getFormDataThunk.rejected]:(state,action)=>{
            state.statusReport = "_REQUEST_FAILED...";
        }
    }
})
export default formDataSlice.reducer;