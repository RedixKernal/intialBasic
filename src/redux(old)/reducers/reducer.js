import { _POST } from "../actiontypes/actionType";
const _INTIAL_POST_DATA={
    FormData:[],
};
const postreducer = (state = _INTIAL_POST_DATA, action) =>{
    switch(action.type){
        case _POST:
            return {
                ...state,
                FormData:action.payload,
            }
        default: return state;
    }
}
export default postreducer;