import React, { Component } from 'react';
import Card from '../module/card';
import img1 from '../../Asstets/20211122_103107.jpg'
import '../module/card.css';
class Update extends Component {
    update = [
        {
            title:'Titan vr 4.23.5',
            des:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu quam id purus gravida hendrerit. Cras in tellus consequat, porttitor mauris in, suscipit lectus. Vestibulum vulputate tortor a augue finibus,',
            poster:img1,
            cost:'12'
        },
        {
            title:'TIN Adiction Vr 3.45.6',
            des:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu quam id purus gravida hendrerit. Cras in tellus consequat, porttitor mauris in, suscipit lectus. Vestibulum vulputate tortor a augue finibus,',
            poster:img1,
            cost:'16'
        },
        {
            title:'Connection vr 4.33.5',
            des:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu quam id purus gravida hendrerit. Cras in tellus consequat, porttitor mauris in, suscipit lectus. Vestibulum vulputate tortor a augue finibus,',
            poster:img1,
            cost:'24'
        },
        {
            title:'Meta  Vr 3.75.6',
            des:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu quam id purus gravida hendrerit. Cras in tellus consequat, porttitor mauris in, suscipit lectus. Vestibulum vulputate tortor a augue finibus,',
            poster:img1,
            cost:'34'
        }
    ]
    render() {
        return (
            <div className="cus_section">
                 {
                    this.update.map(obj=> {
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

export default Update;
