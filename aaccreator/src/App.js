import React, { useState } from 'react';
import './App.css';

import { Box } from './Box.js';
import { Device } from './Device.js';
import { Popup } from './Popup.js';

const users = [
  { user: "User", Pass: "pass" }
]
const devices = [
  { name: "AacDevice1", id: 1, boxes: [{ id: 1, text: "Cat", image: "C:/Users/phill/IdeaProjects/aacdevice/aaccreator/cat.jpg" },{ id: 1, text: "Dog", image: "C:/Users/phill/IdeaProjects/aacdevice/aaccreator/cat.jpg" },{ text: "Horse", image: "C:/Users/phill/IdeaProjects/aacdevice/aaccreator/cat.jpg" }]}
]
const wWords = [
  { id: 0, text: "who"},
  {id : 0, text: "what"},
  {id : 0, text: "where"}
]
const boxes = [
  {id:1, text: "Cat", image: "", isDeleted: true}
];

var sentenceContainer = {
  sentence: "This"
};
function appendVal(val) {
  sentenceContainer.sentence = sentenceContainer.sentence + val;
}

function App() {
  const [ids, texts, images] = useState(boxes);
  return (
    <div className="app-root" >
      <div className="header">
      <span id='titleLabel' for="title">Name for AAC Device: </span>
      <input id='title' type='text'></input>
      <button class='saveButton' onClick ={() => {
        const inputTitle = document.getElementById('title');
        var bool = 0;
        for (const device in devices) {
          if (inputTitle.getValue == device.name) {
            //update table mysql
            bool = 1;
          }
        }
        if (bool ==1) {
          //push to mysql table
          devices.push(1,inputTitle.getValue,[]);
        }

      }}>Save</button>
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
      <input type="text" id="sentence" value={sentenceContainer.sentence}></input>
      <button id="clear" onClick={() => {
        sentenceContainer.sentence = "";
      }}>Clear</button>
      </div>
      <div className ="device">
        <div id="addBox" >
          <input id= "inputText" type="text" placeholder="Card Text"></input>
          <button id="upload" onClick={() => {
            //upload image
          }}>Upload Image</button>
          <button id="submit" onClick={() => {
            const input_text = document.getElementById("inputText").value;
            const input_image = document.getElementById("upload").value;
            for (const box in boxes) {
              var bool = 0;
              if (box.text == input_text) {
                bool = 1;
              }
              if (bool ==0) {
                boxes.push([input_text, input_image]);
                for(const device in devices) {
                  if (device.id == box.id) {
                    device.boxes.push(box.id, box.text, box.image);
                  }
              }
            }
          }
    }}>Add Box</button>
    </div><br></br>
        {boxes.map(box => <Box key={box.text}
        box={box} />)}
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
export {appendVal};
