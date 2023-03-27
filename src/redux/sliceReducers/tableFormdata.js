import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    tableData:[
        { 
            fullName:'admin',
            userName:'admin1',
            id:'1',
            mobile:'6900000096',
            password:'admin@123',
            redixStatus:'allowed'
        },
        { 
            fullName:'RkPower',
            userName:'Titan18',
            id:'18',
            mobile:'9900009956',
            password:'Cr38@18',
            redixStatus:'allowed'
        },
        { 
            fullName:'name3',
            userName:'user3',
            id:'3',
            mobile:'9900009967',
            password:'name3@123',
            redixStatus:'allowed'
        }
    ]
}
const TableDataReducer = createSlice({
    name:'tableData',
    initialState,
    reducers:{
        tableData:(state,action) =>{
            state.tableData.push(action.payload)
        },
        editData:(state,action) => {
            // eslint-disable-next-line array-callback-return
            state.tableData.map((tableData) =>{
                if(tableData.id === action.payload.id){
                    tableData.fullName  = action.payload.fullName
                    tableData.userName  = action.payload.userName
                    tableData.mobile  = action.payload.mobile
                    tableData.password  = action.payload.password
                    tableData.redixStatus  = action.payload.redixStatus
                }
            })
        },
        deleteData:(state,action) => {
            state.tableData = state.tableData.filter((tableData) =>tableData.id !== action.payload.id )
        }
    }
})
export const {tableData ,editData ,deleteData} = TableDataReducer.actions;
export default TableDataReducer.reducer;