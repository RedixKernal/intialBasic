import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import { tableData ,editData } from '../redux/sliceReducers/tableFormdata';
import { useDispatch } from 'react-redux';
import { MetaTags } from 'react-meta-tags';

const myStyles = {
    container: {
      margin:"20px 0px"
    },
    textField:{
      margin:"10px 10px",
    },
    buttons:{
      margin:"0px 15px",
      float:"right",
      backgroundColor:"blue",
      color:"white",
    },
    buttons1:{
      margin:"0px 15px",
      float:"right",
      color:"blue",
    }
}
const Form = ({obj,onClose,toogle}) => {
  const dispatch = useDispatch();
  const defaultValues = {
      fullName:obj?.fullName ? obj.fullName : '',
      userName:obj?.userName ? obj.userName : '',
      id:obj?.id ? obj.id : '',
      mobile:obj?.mobile ? obj.mobile : '',
      password:obj?.password ? obj.password :'',
      redixStatus:obj?.redixStatus ? obj.redixStatus : '',
  }
    const {control, handleSubmit } = useForm({
        defaultValues:defaultValues
    });
    const onSubmit = (data) => {
        toogle
        ?dispatch(tableData(data))
        :dispatch(editData(data))
    }
    return (
    <>
        <div style={myStyles.container}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Controller
                            name="fullName"
                            control={control}
                            render={({ field }) => <TextField style={myStyles.textField} {...field} id="outlined-basic" label="FullName" variant="outlined" />}
                        />
                    
                        <Controller
                            name="userName"
                            control={control}
                            render={({ field }) => <TextField style={myStyles.textField} {...field} id="outlined-basic" label="UserName" variant="outlined" />}
                        />
                    </div>
                    <div>
                        <Controller
                            name="id"
                            control={control}
                            render={({ field }) => <TextField style={myStyles.textField} {...field} id="outlined-basic" label="Enter ID" variant="outlined" />}
                        />
                    
                        <Controller
                            name="mobile"
                            control={control}
                            render={({ field }) => <TextField style={myStyles.textField} {...field} id="outlined-basic" label="MobileNumber" variant="outlined" />}
                        />
                    </div>
                    <div>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => <TextField style={myStyles.textField} {...field} id="outlined-basic" label="Password" variant="outlined" />}
                        />
                   
                        <Controller
                            name="redixStatus"
                            control={control}
                            render={({ field }) => <TextField style={myStyles.textField} {...field} id="outlined-basic" label="RedixStatus" variant="outlined" />}
                        />
                    </div>
                    
                    <Button variant="contained" style={myStyles.buttons} type="submit">Submit</Button>
                    <Button variant="text" style={myStyles.buttons1} type="button" onClick={onClose}>Cancel</Button>
                </form>
        </div>
        <MetaTags>
        <title>{obj?.fullName ? obj.fullName : 'add Employee'}</title>
        <meta name="description" content="adding data to the table" />
      </MetaTags>
      </>
    
    );
}

export default Form;
