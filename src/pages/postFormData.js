import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useDispatch ,useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getFormDataThunk } from '../redux/sliceReducers/getDataSlideReducer';
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

const actions=[
    {
      icon: "regester",
      tooltip: 'BackUp',
      isFreeAction: true,
      onClick:((rowData) =>rowData)
    }
]

const Postformdata = () => {
    const history = useHistory();
    const data =  useSelector(({formPost}) => formPost.intialPost)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFormDataThunk())
    },[dispatch])
    return (
        <>
        <div style={styleByRk.contentBox}>
            <div style={styleByRk.contentBoxinner}>
                <div style={styleByRk.table} >
                    <MaterialTable
                        title="Employee Data"
                        columns={columns}
                        data={data}
                        actions={actions}
                        components={{
                            Action: props => (
                            <>
                            {props.action.icon === 'regester' && 
                               <Button
                                    onClick={(event) => {
                                        props.action.onClick(props.data)
                                    }}
                                    color="primary"
                                    variant="contained"
                                    style={{
                                        textTransform: 'none',
                                        margin:"0px 10px",
                                        backgroundColor:"rgba(8, 0, 56, 0.863)",
                                        curser:"pointer",
                                        letterSpacing:"1px"
                                    }}
                                    size="small"
                                    >
                                    Register
                                </Button>
                            }
                            </>
                            )
                        }}
                        options={{
                            headerStyle:{
                               backgroundColor:"rgba(8, 0, 56, 0.863)",
                               color:"white",
                               textTransform:"uppercase",
                               textAlign:"center",
                            },
                            rowStyle: {
                                textTransform:"capitalize",
                                textAlign:"center",
                                backgroundColor:"rgba(226, 226, 226, 0.5)"
                            },
                        }}
                    />
                </div>
            </div>
            <Button style={styleByRk.buttons} onClick={()=>history.push('/')} variant="contained">Back To Home</Button>
        </div>

        {/* <div>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <div style={styleByRk.dialogTitle}>
                        {
                            toogle
                            ?<h3>Add Employee</h3>
                            :!toogle && !ntf
                            ?<h3>Edit Employee</h3>
                            :<h3>Notification!</h3>
                        }
                        
                        <IconButton style={{color:"white",curser:"pointer"}} aria-label="upload picture" onClick={handleClose} component="span">
                            {!ntf &&<CloseIcon/>}
                        </IconButton>
                    </div>
                    <DialogContent dividers style={styleByRk.Dialog}>
                       
                          {
                          
                          toogle
                            ?<Form obj={obj} onClose={handleClose} toogle={toogle}/>
                            :!toogle && !ntf
                            ?<Form obj={obj} onClose={handleClose} toogle={toogle}/>
                            :<Notification  obj={obj} onClose={handleClose} setNtf={setNtf}/>
                         }
                    </DialogContent>
                </BootstrapDialog>
        </div> */}

        <MetaTags>
        <title>Employee Data</title>
        <meta name="description" content="all employee data " />
      </MetaTags>
      </>
    );
}

export default Postformdata;
