import React, { useState } from 'react';
import './App.css';

import { Box } from './Box.js';
import { Device } from './Device.js';

const users = [
  { user: "User", Pass: "pass" }
]
const devices = [
  { name: "AacDevice1", id: 1, boxID: 1 }
]
const listBox = [
  { id: 1, deviceID: 1 }
]
const wWords = [
  { id: 0, text: "who"},
  {id : 0, text: "what"},
  {id : 0, text: "where"}
]
const boxes = [
  { id: 1, text: "Cat", image: "C:/Users/phill/IdeaProjects/aacdevice/aaccreator/cat.jpg" },
  { id: 1, text: "Dog", image: "C:/Users/phill/IdeaProjects/aacdevice/aaccreator/cat.jpg" },
  { id: 1, text: "Horse", image: "C:/Users/phill/IdeaProjects/aacdevice/aaccreator/cat.jpg" }
];
let sentenceValue = "text";
function appendVal(val) {
  sentenceValue = "newText";
}
function App() {
  const [ids, texts, images] = useState(boxes);
  return (
    <div className="app-root">
      <div className="header">
      <span id='titleLabel' for="title">Name for AAC Device: </span>
      <input id='title' type='text'></input>
      <button class='saveButton'>Save</button>
      <input id='searchInput' type='text' placeholder="Search..."></input>
      <button class='search' onCLick={() => {
        for (const device in devices) {
            if (device.name == searchInput.value) {
              
            }
        }
      }}>Search</button>
      </div>
      <input id="sentence" value ={sentenceValue}></input>
      <div className ="device">
        <div id="addBox" >
          <input id= "inputText" type="text" ></input>
          <button id="upload" onClick={() => {

          }}>Upload Image</button>
          <button id="submit" onClick={() => {
            const input_text = document.getElementById("inputText").value;
            const input_image = document.getElementById("upload").value;
            boxes.push([input_text, input_image]);
    }}>Add Box</button>
    </div><br></br>
        {boxes.map(box => <Box key={box.text}
        box={box} />)}
    </div>
    </div>
  );
}

export default App;
export {sentenceValue, appendVal};
