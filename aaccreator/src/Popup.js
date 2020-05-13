import React, {useState} from 'react';

export function Popup(props) {
   const device = props.device;
    //give a box
    return (

        <button className = 'deviceName' onClick={() => {

        }}> {device.name}}</button>
    );
}