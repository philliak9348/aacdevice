import React from 'react';

import {appendVal} from './App';
export function Box(box) {
    //give a box
    return (
    <button id = "box-root" className = "visible" onClick={() => {
        appendVal(box.text);
    }}>
        <div className = 'boxText'> {box.text}</div>
        <div className = 'boxImage'><img id="boxImage" alt={box.text} src={box.image}></img></div>
    </button>
    );
}