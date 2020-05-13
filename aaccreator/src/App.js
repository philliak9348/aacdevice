import React, { useState } from 'react';
import './App.css';

import { Box } from './Box.js';
import { Device } from './Device.js';
import { Popup } from './Popup.js';
var users = [
  { user: "User", Pass: "pass" }
]
var devices = [
  { name: "AacDevice1", id: 1},
  { name: "AacDevice2", id: 2}
]
var wWords = [
  { id: 0, text: "who", image: "whatImage"},
  {id : 0, text: "what", image: "whatIMage"},
  {id : 0, text: "where", image: "whereImage"}, 
  {id: 0, text:"is", image: "isImage"},
  {id: 0, text:"that", image: "thatImage"}
]
var allBoxes = [
  {id:1, text:"cat", image: "catImage"},
  {id:1, text:"Dog", image:"dogImage"},
  {id:2, text:"Woman", image: "womanImage"},
  {id:2, text:"Child", image: "childImage"},
  { id: 0, text: "who", image: "whatImage"},
{id : 0, text: "what", image: "whatIMage"},
{id : 0, text: "where", image: "whereImage"}, 
{id: 0, text:"is", image: "isImage"},
{id: 0, text:"that", image: "thatImage"}
]
var boxes = [
]

var sentenceVal = "";
function appendVal(val) {
  var temp = "";
  temp = sentenceVal.concat("", val+" ");
  sentenceVal = temp;
  const sentenceValue = document.getElementById('sentence');
  sentenceValue.value = sentenceVal;
}
function clear() {
  var temp = sentenceVal.substring(sentenceVal.length);
  sentenceVal = temp;
  const sentenceValue = document.getElementById('sentence');
  sentenceValue.value = sentenceVal;
}
function newDevice(deviceID) {
  while(boxes.length>0) {
    boxes.pop();
  }
  var i = 0;
  allBoxes.forEach(function(abox) {
    if (abox.id === deviceID) {
      abox[i] = (abox);
      i = i+1;
    }
  });
}
var currentBoxes = [];
function refreshBoxes() {
    while(currentBoxes.length>0) {
      currentBoxes.pop();
    }
    var i = 0;
    boxes.forEach(function (box) {
    var thisBox = <Box key = {box.id} text={box.text} image = {box.image}></Box>
    currentBoxes[i] = (thisBox);
    i++;
});}
function App() {
  
  return (
    <div className="app-root" >
      <div className="header">
      <span id='titleLabel' for="title">Name for AAC Device: </span>
      <input id='title' type='text'></input>
      <button class='saveButton' onClick ={() => {
        var inputTitle = document.getElementById('title').value;
        var bool = 0;
        devices.forEach(function (device){
          if (inputTitle === device.name) {
            //update table mysql
            bool = 1;
          }
          if (bool ===0) {
          //push to mysql table
          devices.push({name: inputTitle, id: 2});
        }
        });}}>Save</button>
      <button type = "button" class='search' onClick={() => {
        const popup = document.getElementById('popup');
        popup.classList.toggle("hidden");
        popup.classList.toggle("visible");
      }}>Find Device</button>
      <button type = "button" class="add" onClick={() => {
        const addElement = document.getElementById("addBox");
        addElement.classList.toggle('visibile');
        addElement.classList.toggle('hidden');
      }}>Add Box</button>
      </div>
      <div id="sentenceBlock">
      <input type="text" id="sentence" placeholder = "Text will appear here..."></input>
      <button id="clear" onClick={() => {
        clear();
      }}>Clear</button>
      </div>
      <div className ="device">
        <div id="addBox" >
          <input id= "inputText" type="text" placeholder="Card Text"></input>
          <button id="upload" onClick={() => {
            //upload image
          }}>Upload Image</button>
          <button id="submit" onClick={() => {
            var bool = 0;
            const input_text = document.getElementById("inputText").value;
            const input_image = document.getElementById("upload").value;
            if (bool === 0) {
              boxes[boxes.length+1] = ({id: 1, text: input_text, image: input_image});
              refreshBoxes();
            }
          }}>Add Box</button>
    </div><br></br>
    {refreshBoxes()}
    {currentBoxes}
    </div>
    <div class="hidden" id="popup" >
      <div>Click on an AAC Device to open.</div>
      <button className = 'exit' onClick={() => {
            const popup = document.getElementById('popup');
            popup.classList.toggle("hidden");
            popup.classList.toggle("visible");
        }}>&#10006;</button>
      {devices.map(device => <Popup key={device.name} device = {device} />)}
    </div>
    </div>
  );
}

export default App;
export {sentenceVal, appendVal, allBoxes, boxes, refreshBoxes, newDevice};
