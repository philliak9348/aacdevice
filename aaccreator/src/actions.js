const host = 'http://142.93.245.197:3443';
export const Action = Object.freeze({
    LoadBoxes: 'loadBoxes',
    completeBox: 'completeBox',
    loadDevices: 'loadDevices',
    addBoxes: 'addBoxes',
    pullBoxes: 'pullBoxes',
    addDevice: 'addDevice',
    completeDevice: 'completeDevice',
    ToggleWaiting: "ToggleWaiting",
});
export function toggleWaiting() {
    return{
        type:Action.ToggleWaiting,
    };
}
export function loadBoxes(Boxes) {
    return{
        type:Action.loadBoxes,
        payload:Boxes,
    };
}
export function loadDevices(Devices) {
    return {
        type:Action.loadDevices,
        payload:Devices,
    };
}
export function completeBox(box) {
    return {
        type:Action.completeBox,
        payload:box,
    };
}
export function completeDevice(device) {
    return {
        type:Action.completeDevice,
        payload:device
    }
}

export function pullBoxes(Boxes) {
    return dispatch => {
        dispatch(toggleWaiting());
        fetch(`${host}/aac/boxes`)
            .then(checkForErrors)
            .then(response=> response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(loadBoxes(data.boxes));
                }
            })
            .catch(e=>console.error(e));
        };
}
export function pullDevices(Devices) {
    return dispatch => {
        dispatch(toggleWaiting());
        fetch(`${host}/aac/devs`)
            .then(checkForErrors)
            .then(response=> response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(loadDevices(data.devices));
                }
            })
            .catch(e=>console.error(e));
        };
}
export function addBoxes(id, text, image) {
    const box = { id, text ,image };
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(box),}
    return dispatch => {
        dispatch(toggleWaiting());
        fetch(`${host}/aac/boxes/`, options)
            .then(checkForErrors())
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    box.id = data.id;
                    box.text = data.text;
                    box.image = data.image;
                    dispatch(completeBox(box));
                }
            })
            .catch(e => console.error(e));
        }
    }
    export function addDevice(id, name) {
        const device = {id, name};
        const options = {
            method: 'POST',
            headers:{'Content-Type': 'application/json',},
            body: JSON.stringify(device),
        }
        return dispatch => {
            dispatch(toggleWaiting());
            fetch(`${host}/aac/boxes/`, options)
                .then(checkForErrors)
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        device.id = data.id;
                        device.name = data.name;
                        dispatch(completeDevice(device));
                    }
                })
                .catch(e => console.error(e));
            };
        }
function checkForErrors(response) {
    if (!response.ok) {
        throw Error(response.status + ":" + response.statusText);
    }
    return response;
}
