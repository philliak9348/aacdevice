import React, {useState} from 'react';

import {sentenceValue, appendVal} from './App';

export function Box(props) {
   const box = props.box;
    //give a box
    return (
    <button className = "box-root" onClick={() => {
        appendVal("text");
    }}>
        <div className = 'boxText'> {box.text}}</div>
        <div className = 'boxImage'><img alt="image" src={box.image}></img></div>
    </button>
    );
}