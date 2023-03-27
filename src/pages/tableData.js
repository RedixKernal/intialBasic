import React,{ useState , useEffect} from 'react';
import MaterialTable from '@material-table/core';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Form from '../helpers/form';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import { MetaTags } from 'react-meta-tags';
import DeleteIcon from '@mui/icons-material/Delete';
import Notification from '../helpers/notification';

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
    dialogTitle:{
        padding:"4px 20px",
        width:"100%",
        height:"60px",
        display: "flex",
        alignItems:"center",
        justifyContent:"space-between",
        backgroundColor:"blue",
        color:"white",
    },
    Dialog:{
        width:"38vw",
        height:"330px"
    }
}

const columns = [
    { title: 'fullName', field: 'fullName' },
    { title: 'userName', field: 'userName' },
    { title: 'id', field: 'id' },
    { title: 'mobile',field: 'mobile'},
    { title: 'password',field: 'password'},
    { title: 'redixStatus',field: 'redixStatus'},
    
]
let obj = {}
const calldata = (data) => {
    obj=data;
}
const actions = [
    { 
        icon: "Edit-Emp",
        tooltip: 'Edit',
        onClick: (rowData) => {
            return calldata(rowData)
        }
    },
    { 
        icon: "Delete-Emp",
        tooltip: 'Delete',
        onClick: (rowData) => {
            return calldata(rowData)
        }
    },
    {
        icon: "Add-Emp",
        tooltip: 'AddEMP',
        isFreeAction: true,
        onClick: (rowData) => {
            return calldata({})
        }
    }
]

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

const Tabledata = () => {
    const history = useHistory();
    const {tableData} = useSelector(({tableData}) => tableData);
    const [open, setOpen] = useState(false);
    const [toogle, settoogle] = useState(false);
    const [ntf, setNtf] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(()=>{
        handleClose();
    },[tableData])

    return (
        <div>
            <div style={styleByRk.contentBox}>
                <div style={styleByRk.contentBoxinner}>
                    <div style={styleByRk.table} >
                        <MaterialTable
                            title="Employee Data"
                            columns={columns}
                            data={tableData}
                            actions={actions}
                            options={{
                                headerStyle:{
                                    backgroundColor:"rgba(200, 100, 10, 0.863)",
                                    color:"white",
                                    textTransform:"uppercase",
                                    textAlign:"center",
                                },
                                rowStyle:{
                                    textTransform:"capitalize",
                                    textAlign:"center",
                                    backgroundColor:"rgba(226, 226, 226, 0.8)"
                                },
                            }}
                            components={{

                                Action: props => (
                                    <>      
                                {props.action.icon === 'Edit-Emp' && 
                                    <IconButton style={{color:"green",curser:"pointer"}} 
                                        aria-label="Edit" onClick={(event)=>{
                                        handleClickOpen()
                                        settoogle(false)
                                        props.action.onClick(props.data)
                                    }} component="span">
                                        <EditIcon/>
                                    </IconButton>
                                }

                                {props.action.icon === 'Delete-Emp' && 
                                    <IconButton style={{color:"#ff5c5cdc",curser:"pointer"}} 
                                        aria-label="Edit" onClick={(event)=>{
                                            handleClickOpen()
                                            setNtf(true)
                                            settoogle(false)
                                            props.action.onClick(props.data)
                                    }} component="span">
                                        <DeleteIcon/>
                                    </IconButton>
                                }

                                {props.action.icon === 'Add-Emp' &&                         
                                    <Button
                                    onClick={(event) => {
                                        handleClickOpen()
                                        settoogle(true)
                                        props.action.onClick(props.data)
                                    }}
                                    color="primary"
                                    variant="contained"
                                    style={{
                                        textTransform: 'none',
                                        margin:"0px 10px",
                                        backgroundColor:"rgba(200, 100, 10, 0.863)",
                                        curser:"pointer",
                                        letterSpacing:"2px"
                                    }}
                                    size="small"
                                    >
                                    NewRecord
                                    </Button>
                                }
                                    </>

                                ),
                            }}
                        />
                    </div>
                </div>
                <Button style={styleByRk.buttons} onClick={()=>history.push('/')} variant="contained">Back To Home</Button>
            </div>

            <div>
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
            </div>

            <MetaTags>
                <title>New - Employee Data</title>
                <meta name="description" content="add employee data table" />
            </MetaTags>
        </div>
    )
}

export default Tabledata;
