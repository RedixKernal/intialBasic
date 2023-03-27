import axios from "axios";
import { _POST } from "../actiontypes/actionType"
const PostData = () => {
   
    return dispatch => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((res) => {
            if (res.status >= 200 && res.status < 400) {
                dispatch({ type:_POST, payload:res.data})
            } 
        })
        .catch((e) =>{
            console.log(e);
        })
    }
}
export default PostData;