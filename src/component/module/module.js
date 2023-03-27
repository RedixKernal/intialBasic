import React, { Component } from 'react';
import Card from './card';
import './card.css';
import img1 from '../../Asstets/20211122_103107.jpg';
class Module extends Component {
    module = [
        {
            title:'Titan vr 4.23.5',
            des:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu quam id purus gravida hendrerit. Cras in tellus consequat, porttitor mauris in, suscipit lectus. Vestibulum vulputate tortor a augue finibus,',
            poster:img1,
            cost:'240'
        },
        {
            title:'TIN Adiction Vr 3.45.6',
            des:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu quam id purus gravida hendrerit. Cras in tellus consequat, porttitor mauris in, suscipit lectus. Vestibulum vulputate tortor a augue finibus,',
            poster:img1,
            cost:'160'
        },
        {
            title:'Connection vr 4.33.5',
            des:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu quam id purus gravida hendrerit. Cras in tellus consequat, porttitor mauris in, suscipit lectus. Vestibulum vulputate tortor a augue finibus,',
            poster:img1,
            cost:'240'
        },
        {
            title:'Meta  Vr 3.75.6',
            des:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu quam id purus gravida hendrerit. Cras in tellus consequat, porttitor mauris in, suscipit lectus. Vestibulum vulputate tortor a augue finibus,',
            poster:img1,
            cost:'160'
        }
    ]
    render() {
        return (
            <div className="cus_section">
                {
                    this.module.map(obj=> {
                        // console.log(obj.title);
                       return <Card key={obj.title}
                        title={obj.title}
                        des={obj.des}
                        poster={obj.poster}
                        cost={obj.cost}
                        />
                    })
                }
                
            </div>
        );
    }
}

export default Module;
