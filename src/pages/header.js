import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { MetaTags } from 'react-meta-tags';
import Resuablemeta from '../helpers/ResuableMeta';


const styleByRk = {
    buttons:{
        margin:"5px 10px"
    },
    link:{
        textDecoration:"None",
        color:"white"
    }
}
const Header = () => {
    const location = useLocation();
    return (
        <div>
            {
            location.pathname === '/'&&
            <div>
                <Button style={styleByRk.buttons} variant="contained"><Link style={styleByRk.link} to="/post">All Employes</Link></Button>
                <Button style={styleByRk.buttons} variant="contained"><Link style={styleByRk.link} to="/form">Table</Link></Button>
            </div>
            }
             <Resuablemeta MetaObject={
      [
        {
          title:"App Page Title"
        },
        {
          name:"description",
          content:"App Data Content"
        },
        {
            name:"auther",
            content:"AutherBY book"
        }
      ]
    }/>
        </div>
    );
}

export default Header;
