import React, {useState} from 'react';

import {sentenceVal, appendVal} from './App';
export function Box(box) {
    //give a box
    return (
    <button id = "box-root" class = "visible" onClick={() => {
        appendVal(box.text);
    }}>
        <div className = 'boxText'> {box.text}</div>
        <div className = 'boxImage'><img alt="image" src={box.image}></img></div>
    </button>
    );
}