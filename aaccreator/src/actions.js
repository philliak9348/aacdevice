const host = 'https://aac-api.aaccreator.duckdns.org:8442';
export const Action = Object.freeze({
    loadBoxes: 'loadBoxes',
    completeBox: 'completeBox',
    loadDevices: 'loadDevices',
    addBoxes: 'addBoxes',
    pullBoxes: 'pullBoxes',
    addDevice: 'addDevice',
    completeDevice: 'completeDevice',
    pullDevices: 'pullDevices',
    ToggleWaiting: "ToggleWaiting",
});
export function toggleWaiting() {
    return{
        type:Action.ToggleWaiting,
    };
}
export function loadBoxes(Boxes) {
    console.log(Boxes);
    return{
        type:Action.loadBoxes,
        payload:Boxes,
    };
}
export function loadDevices(Devices) {
    console.log(Devices);
    return{
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
export function completeDevice(Devs) {
    return {
        type:Action.completeDevice,
        payload:Devs
    }
}
function checkForErrors(response) {
    console.log(response.ok);
    if (!response.ok) {
        throw Error(response.status + ":" + response.statusText);
    }
    return response;
}

export function pullBoxes() {
    return dispatch => {
        dispatch(toggleWaiting());
        fetch(`${host}/aac/boxes`)
            .then(checkForErrors)
            .then(response=> response.json())
            .then(data => {
                console.log(data.ok);
                if (data.ok) {
                    dispatch(loadBoxes(data.Boxes));
                }
            })
            .catch(e=>console.error(e));
        };
}


export function pullDevices() {
    return dispatch => {
        dispatch(toggleWaiting());
        fetch(`${host}/aac/devs`)
            .then(checkForErrors)
            .then(response=> response.json())
            .then(data => {
                console.log(data.ok);
                if (data.ok) {
                    dispatch(loadDevices(data.Devices));
                }
            })
            .catch(e=>console.error(e));
        };
}
export function addBox(id, text, image) {
    console.log(id);
    console.log(text);
    console.log(image);
    const box = { id, text , image};
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'
        },
        body: JSON.stringify(box),
    }
    return dispatch => {
        dispatch(toggleWaiting());
        fetch(`${host}/aac/Boxes`, options)
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
        };
    }
    export function addDevice(id, name) {
        const Devs = {id, name};
        const options = {
            method: 'POST',
            headers:{'Content-Type': 'application/json',},
            body: JSON.stringify(Devs),
        }
        return dispatch => {
            dispatch(toggleWaiting());  
            fetch(`${host}/aac/Devs/`, options)
                .then(checkForErrors)
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        Devs.id = data.id;
                        Devs.name = data.name;
                        dispatch(completeDevice(Devs));
                    }
                })
                .catch(e => console.error(e));
            };
        }