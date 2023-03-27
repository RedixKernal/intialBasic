import React from 'react';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel } from '@mui/material';
import { Controller ,useForm} from 'react-hook-form';
import { searchEmployeeID } from '../redux/sliceReducers/empIDReducer';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const styleByRk = {
    container: {
        maxWidth:"100%",
        minHeight:"80Vh",
        display: "flex",
        justifyContent:"center",
        alignItems:"center",
    },
    containerChild:{
        width:"300px",
        minHeight:"250px",
        boxShadow:"1px 1px 10px rgba(172, 172, 172, 0.555)",
        padding:"10px",
        borderRadius:"6px"
    },
    inputField:{
        position:"relative",
        top:"20px",
        width:"100%",
        height:"auto",
        outline:"none",
        margin:"4px 0px"
    },
    buttonField:{
        position:"relative",
        top:"50px",
        width:"100%",
        height:"auto",
        margin:"4px 0px",
        display:"flex",
        justifyContent:"flex-end",
    },
    buttons:{
        margin:"5px 10px"
    },
}
const Searchdata = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { control , handleSubmit} = useForm({
        defaultValues:{
            value:'',
            DataType:'',
        }
    });
    const onSubmit = (data) => {
        dispatch(searchEmployeeID(data));
        history.push('/get');
    };
    const menuItemOptions=[
    
        {
            key:'userId',value:'userId'
        },
        {
            key:'id',value:'Id'
        },
        {
            key:'title',value:'Title'
        },
        {
            key:'body',value:'Body'
        },
    ]
    return (
        <div style={styleByRk.container}>
            <div style={styleByRk.containerChild}>
                <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="DataType"
                        control={control}
                        render={
                            ({field}) => {
                                return <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                                <Select
                                {...field}
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  label="SelectType"
                                >
                                  {
                                      menuItemOptions.map((data,index) => {
                                        return <MenuItem value={data.key} key={index}>{data.value}</MenuItem>
                                        
                                      })
                                  }
                                </Select>
                              </FormControl>
                            }
                        }
                        />
   
                    <Controller
                        name="value"
                        control={control}
                        render={({ field }) => <TextField style={styleByRk.inputField} {...field} id="outlined-basic" label="Search..." variant="outlined" />}
                    />
                     <div style={styleByRk.buttonField}>
                    <Button style={styleByRk.buttons} variant="text">Cancel</Button>
                    <Button style={styleByRk.buttons} type="submit" variant="contained">Submit</Button>
                </div>
                </form>
                </div>
            </div>
        </div>
    );
}

export default Searchdata;
