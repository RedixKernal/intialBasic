import formDataSlice from './getDataSlideReducer';
import searchEmployeeIDReducer from './empIDReducer';
import getEmpIdDataReducer from './empShowReducer';
import TableDataReducer from './tableFormdata';
export const reducer = {
    formPost:formDataSlice,
    getEmpID:searchEmployeeIDReducer,
    empData:getEmpIdDataReducer,
    tableData:TableDataReducer,
}