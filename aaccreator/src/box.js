import React from 'react';

import {appendVal} from './App';
export function Box(box) {
    //give a box
    return (
    <button id = "box-root" class = "visible" onClick={() => {
        appendVal(box.text);
    }}>
        <div className = 'boxText'> {box.text}</div>
        <div className = 'boxImage'><div id="boxImage">{box.image}</div></div>
    </button>
    );
}