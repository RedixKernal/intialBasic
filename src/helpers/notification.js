import React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { deleteData } from '../redux/sliceReducers/tableFormdata';
const makeNewStyles = {
    container:{
        width:"80%",
        height:"auto",
        position:"absolute",
        top:"50%",
        left:"50%",
        transform: "translate(-50%,-50%)",
        // border:"1px solid red",
        display: "flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        textAlign:"center",
    },
    bottom:{
        margin:"10px",
        display: "flex",
        justifyContent:"flex-end",
        alignItems:"center",
    }
}

const Notification = ({obj ,onClose ,setNtf}) => {
    const dispatch = useDispatch();
    return (
        <div style={makeNewStyles.container} >
            <p>Are You Sure Detele<b> "{obj.fullName}" </b>Employee-Data</p>
            <div style={makeNewStyles.bottom}>
            
            <Button variant="contained" style={{backgroundColor:"#d14402ec",margin:"10px",color:"white",width:"100px"}} onClick={()=>{
                dispatch(deleteData(obj))
                onClose()
                setNtf(false)
            }}>Yes</Button>
            <Button variant="text" style={{backgroundColor:"#dbdbdbec",margin:"10px",color:"Blue",width:"100px"}} onClick={ () => {
                onClose()
                setNtf(false)
            }}>No</Button>
            </div>
        </div>
    );
}

export default Notification;
