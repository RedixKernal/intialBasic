import React from 'react';
import { MetaTags } from 'react-meta-tags';

const Resuablemeta = ({MetaObject}) => {
    // console.log("MetaObject : ",MetaObject)
    return (
       
        <MetaTags>
        {
            MetaObject.map(metaTags => {
              return Object.entries(metaTags).forEach((data) => {
                   data[0] ===  'title'
                   ?<title>{data[1]}</title>
                   :console.log(" : key : ",data[0],"value : ",data[1]) 
                })
            })
        }
         
        </MetaTags>
    );
     
   
}
 

export default Resuablemeta;
