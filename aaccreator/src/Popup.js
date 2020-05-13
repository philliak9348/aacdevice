import React, {useState} from 'react';
import {boxes, allBoxes, appendVal, refreshBoxes, newDevice} from './App.js';

let id = 0;
export function Popup(props) {
   const device = props.device;
    //give a box
    return (
        <button className = 'deviceName' onClick={() => {
            document.getElementById('title').value = device.name;
            newDevice(device.id);
            refreshBoxes();
        }}> {device.name}</button>
    );
}