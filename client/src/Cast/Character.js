import React from 'react';
import './Character.scss'
const character = (props) => (
    <div className="Character">
        <div className="Character-image">
            <a href={props.url}><img src={props.imgUrl} alt={props.personName} /></a>
        </div>
        <div>
            {props.personName}
        </div>
        <div>
            ({props.characterName})
        </div>
    </div>
);
export default character;