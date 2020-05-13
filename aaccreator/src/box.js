import React, {useState} from 'react';

import {appendVal} from './App';

export function Box(props) {
   const box = props.box;
    //give a box
    return (
    <button id = "box-root" class = "visible" onClick={() => {
        appendVal(box.text);
    }}>
        <button className = 'exitBox' onClick={() => {
            box.isDeleted = true;
            const thisBox = document.getElementById('box-root');
            thisBox.classList.toggle('hidden');
        }} >&#10006;</button>
        <div className = 'boxText'> {box.text}}</div>
        <div className = 'boxImage'><img alt="image" src={box.image}></img></div>
    </button>
    );
}