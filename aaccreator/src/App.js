import React, { useEffect, useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { pullBoxes, addBox, pullDevices, addDevice, } from './actions.js';
import { Box } from './Box.js';

let sentenceVal = '';
function appendVal(val) {
  let temp = '';
  temp = sentenceVal.concat('', `${val} `);
  sentenceVal = temp;
  const sentenceValue = document.getElementById('sentence');
  sentenceValue.value = sentenceVal;
}
function clear() {
  const temp = sentenceVal.substring(sentenceVal.length);
  sentenceVal = temp;
  const sentenceValue = document.getElementById('sentence');
  sentenceValue.value = sentenceVal;
}

let currid = 0;

// FUNCTION APP
function App() {
  const boxes = useSelector((state) => state.boxes);
  const isWaiting = useSelector((state) => state.isWaiting);
  const devices = useSelector((state) => state.devices);
  const [newVisual, updateVisual] = useState([
    { id: 0, text: 'DummyText', image: 'DummyImage' },
    {id:0, text:"Cat", image: "CatImage"}  
  ]);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(pullBoxes());
  }, [dispatch]);
  useEffect(() => {
    dispatch(pullDevices());
  }, [dispatch]);


  const addBoxes = (id, text, image) => {
    dispatch(addBox(id, text, image));
  };
  const addDevices = (id, name) => {
    dispatch(addDevice(id, name));
  };
  const runPullDev = () => {
    dispatch(pullDevices());
  };
  const runPullBox = () => {
    dispatch(pullBoxes());
  }

  return (
    <div className="app-root" id="appRoot">
      <div className="appTitle">AACCREATOR: Create and AAC Device</div>
      {isWaiting && <div className="progress"><div className="insideBar"></div></div>}
      <div className="header">
        <button type="button" id="search" className="headerButtons" onClick={() => {
          const popup = document.getElementById('popup');
          popup.classList.toggle('visible');
          popup.classList.toggle('hidden');
            devices.forEach((device) => {
              const innerpopup = document.createElement('button');
              innerpopup.innerText = device.name;
              innerpopup.id = device.id;
              innerpopup.addEventListener('click', () => {
                currid = Number(innerpopup.id);
                document.getElementById('title').value = device.name;
                const i = -1;
                updateVisual(newVisual.filter((newVisual) => newVisual.id === i));
                boxes.forEach((box) => {
                  if (box.id === currid)
                    updateVisual([...newVisual, { id: box.id, text: box.text, image: box.image }]);
                });
              });
              const parentPopup = document.getElementById('popup');
              parentPopup.appendChild(popup);
            });
          }}>Find Device</button>
        <button type="button" id="add" className="headerButtons" onClick={() => {
            const addElement = document.getElementById('addBox');
            addElement.classList.toggle('visible');
            addElement.classList.toggle('hidden');
          }}>Add Box</button>
        <button type="button" id="newDevice" className="headerButton" onClick={() => {
            document.getElementById('title').value = '';
            const i = -1;
            updateVisual(newVisual.filter((newVisual) => newVisual.id === i));
          }}>New Device</button>
      </div><br></br>
      <div id="titleBlock">
        
        <input id="title" type="text" placeholder="DummyTitle.. enter your smarter title here" />
        <button type="button" id="saveButton"  onClick={() => {
          const inputTitle = document.getElementById('title').value;
          if (inputTitle.length > 0) {
            document.getElementById('addBox').classList = "visible";
            const i = -1;
            updateVisual(newVisual.filter((newVisual) => newVisual.id === i));
            currid += 1;
            addDevices(currid, inputTitle);
            runPullDev(pullDevices());
          } else {
            document.getElementById('title').placeholder = 'Enter name before you save!';
          }}}>Save and start building!</button></div>
      <div id="sentenceBlock">
        <input type="text" id="sentence" placeholder="Click on box to start sentence..."></input>
        <button type="button" id="clear" onClick={() => {
            clear();
          }}>Clear</button>
      </div>
      <div className="device">
        <div id="addBox" className="hidden">
          <input id="inputText" type="text" placeholder="Card Text"></input>
          <label id = "uploadButton" htmlFor="upload">Upload Image</label>
          <input type="file" accept="image/jpeg ,image/png" name="uploadImage" id="upload"></input>
          <button type="button" id="submit" onClick={() => {
              let bool = 0;
              const inputText = document.getElementById('inputText').value;
              const inputImage = document.getElementById('upload').value;
              newVisual.forEach((visual) => {
                if (visual.text === inputText) {
                  bool = 1;
                  document.getElementById('inputText').value = "";
                }
              });
              if (bool === 0) {
                addBoxes(currid, inputText, inputImage);
                runPullBox();
                updateVisual([...newVisual, { id: currid, text: inputText, image: inputImage }]);
              }}}>Add Box</button>
        </div>
        <br />
        {newVisual.map((box) => <Box key={box.id} text={box.text} image={box.image} />)}
      </div>
      <div className="hidden" id="popup">
        <div>Click on an AAC Device to open.</div>
        <button type="button" className="exit" id="exit" onClick={() => {
            const popup = document.getElementById('popup');
            while (popup.lastChild !== document.getElementById('exit')) {
              popup.removeChild(popup.lastChild);
            }
            popup.classList.toggle('visible');
            popup.classList.toggle('hidden');
          }}>x</button>
      </div>
    </div>
  );
}

export default App;
export { sentenceVal, appendVal };
