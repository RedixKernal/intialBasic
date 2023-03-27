import React, { Component } from 'react';
import './card.css';

class Card extends Component {
    render() {
        let {title,des,poster,cost} = this.props;
        return (
            <div className="cus_card">
                <div className="leftsec">
                    <div className="title"><h2>{title}</h2></div>
                    <div className="desc"><b>{des}</b></div>
                </div>

                <div className="rightsec">
                    <div className="poster">
                        <img src={poster} alt=".,."/>
                    </div>
                    <div className="pay">
                        <b>${cost} Buy</b>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
