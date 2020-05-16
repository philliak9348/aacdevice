import React, { useState } from 'react';
import './App.css';

import { Box } from './Box.js';
import { Device } from './Device.js';
import { Popup } from './Popup.js';
var currid = 0;
const users = [
  { user: "User", Pass: "pass" }
]
const wWords = [
  {id: 0, text: "who", image: "whatImage"},
  {id : 0, text: "what", image: "whatIMage"},
  {id : 0, text: "where", image: "whereImage"}, 
  {id: 0, text:"is", image: "isImage"},
  {id: 0, text:"that", image: "thatImage"}
]
const allBoxes = [
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
const boxes = []

const device = 0;

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

const currentBoxes = [];

//FUNCTION APP
  function App() {
  const [newBox, updateBoxes]  = useState([{id:2, text:"newBox", image:""}]);
  const [devices,updateDevs] = useState([{name:"AacDevice1", id:2}]);
  const[newVisual, updateVisual] = useState(wWords);
  return (
    <div className="app-root" >
      <div className="header">
      <span id='titleLabel' for="title">Name for AAC Device: </span>
      <input id='title' type='text' placeholder='DummyTitle.. enter your smarter title here'></input>
      <button type = "button"id='saveButton' class = 'headerButton' onClick ={() => {
        var inputTitle = document.getElementById('title').value;
        updateDevs([...devices, {name:inputTitle,id:currid+1}]);
        currid = currid+1;
        }}>Save</button>
      <button type = "button" id='search' class="headerButton" onClick={() => {
        const popup = document.getElementById('popup');
        popup.classList.toggle("visible");
        popup.classList.toggle("hidden");
        {devices.forEach(function (device) {
          const popup = document.createElement("button");
          popup.innerText=device.name;
          popup.id = device.id;
          popup.addEventListener("click", function(){
            currid = popup.id;
            document.getElementById('title').value = device.name;
            //remove elements from newVisual?
            const i = -1;
            updateVisual(newVisual => newVisual.filter(newVisual => newVisual.id === i));
            newBox.forEach(function (box) {
              if (box.id === currid) {
                updateVisual([...newVisual, {id:box.id, text:box.text, image:box.id}]);
              }
            });
          });
          var parentPopup = document.getElementById('popup');
          parentPopup.appendChild(popup);
        })}
      }}>Find Device</button>
      <button type = "button" id="add"class="headerButton" onClick={() => {
        const addElement = document.getElementById("addBox");
        addElement.classList.toggle('visibile');
        addElement.classList.toggle('hidden');
      }}>Add Box</button>
      <button type = "button" id="newDevice" class="headerButton" onClick={() => {
        document.getElementById('title').value = "";
        const i = -1;
        updateVisual(newVisual => newVisual.filter(newVisual => newVisual.id === i));

      }}>New Device</button>
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
            const input_text = document.getElementById("inputText").value
            const input_image = document.getElementById("upload").value;
            boxes.forEach(function (box) {
              if (box.text == input_text) {
              bool = 1;
            }
              });
            if (bool === 0) {
              const string = input_text;
              updateBoxes([...newBox, {id:currid, text: input_text, image:input_image}]);
              var thisBox = <Box key = {currid} text ={input_text} image = {input_image}></Box>
              updateVisual([...newVisual, {id:currid, text:input_text, image:input_image}]);
            }
          }}>Add Box</button>
    </div><br></br>
    {newVisual.map(box => <Box key={box.id} text = {box.text} image = {box.image}/>)}
    </div>
    <div class="hidden" id="popup" >
      <div>Click on an AAC Device to open.</div>
      <button className = 'exit' id = 'exit' onClick={() => {
            const popup = document.getElementById('popup');
            while(popup.lastChild != document.getElementById('exit')) {
              popup.removeChild(popup.lastChild);
            }
            popup.classList.toggle("visible");
            popup.classList.toggle("hidden");
        }}>&#10006;</button>
    </div>
    </div>
  );
}

export default App;
export {sentenceVal, appendVal, allBoxes, boxes};
