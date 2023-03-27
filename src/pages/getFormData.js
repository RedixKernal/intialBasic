import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getEmpIdData } from '../redux/sliceReducers/empShowReducer';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import MaterialTable from '@material-table/core';
import { MetaTags } from 'react-meta-tags';

const styleByRk = {
    contentBox:{
        width:'100%',
        minHeight:"100vh",
        display: "flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
    },
    contentBoxinner:{
        overflow: 'auto',
        width:'90%',
        minHeight:"70vh",
        display: "flex",
        justifyContent:"center",
        boxShadow:"0px 0px 4px rgba(209, 209, 209,0.8)",
        borderRadius:"10px"
    },
    table:{
        width:"100%",
    },
    h2:{
        margin:"4px 0px"
    },
    buttons:{
        margin:"10px"
    },
}

const columns = [
    { title: 'USERID', field: 'userId' },
    { title: 'ID', field: 'id' },
    { title: 'TITLE', field: 'title' },
    { title: 'BODY',field: 'id'},
]
const Getformdata = () => {
    const history = useHistory();
    const { EmployeeData } =  useSelector(({empData}) => empData)
    const employeeID =  useSelector(({getEmpID}) => getEmpID.employeeID)
    const dispatch = useDispatch();

    useEffect(() => {
        if(employeeID.value === null ||employeeID.value === undefined ||employeeID.value === "" || employeeID.value === " "){
            history.push('/');
        }else{
            dispatch(getEmpIdData(employeeID));
        }
    },[dispatch,employeeID,history])
    return (
        <>
            <div style={styleByRk.contentBox}>
                <div style={styleByRk.contentBoxinner}>
                    <div style={styleByRk.table} >
                        <MaterialTable
                            title="Search Result"
                            columns={columns}
                            data={EmployeeData}
                            options={{
                                headerStyle:{
                                backgroundColor:"rgba(8, 0, 56, 0.863)",
                                color:"white",
                                textTransform:"uppercase",
                                textAlign:"center",
                                },
                                rowStyle: {
                                    textTransform:"uppercase",
                                    textAlign:"center",
                                    backgroundColor:"rgba(226, 226, 226, 0.5)"
                                },
                            }}
                        />
                    </div>
                </div>
                <Button style={styleByRk.buttons} onClick={()=>history.push('/')} variant="contained">Back To Home</Button>
            </div>
            
            <MetaTags>
                <title>{
                    EmployeeData.map(data => `${data.id} - ${data.title}`)
                    }</title>
                <meta name="description" content={
                    EmployeeData.map(data => `${data.id} - ${data.body}`)
                } />
            </MetaTags>
        </>
    );
}

export default Getformdata;



