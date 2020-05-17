import { Action } from './actions.js';

const initialStart = {
    isWaiting: false,
    boxes: [],
    devices:[],
};
export function reducer(state = initialStart, action) {
    console.log(action);
    switch (action.type) {
        case Action.LoadBoxes:
            return {
                ...state,
                isWaiting: false,
                boxes: action.payload,
            };
        case Action.completeBox:
            return {
                ...state,
                isWaiting: false,
                boxes: [action.payload, ...state.boxes],
            };
        case Action.loadDevices:
            return {
                ...state,
                isWaiting: false,
                devices: action.payload,
            };
        case Action.completeDevice:
            return{
                ...state,
                isWaiting: false,
                devices:[action.payload, ...state.devices],
            };
        case Action.ToggleWaiting:
            return{
                ...state,
                isWaiting:true,
            };
        default:
            return state;
    };
}
/**
 * const initialStateDev = {
    devices:[],
}
 * function reducerDev(state = initialStateDev, action) {
    switch (action.type) {
        case Action.loadDevices:
            return {
                ...state,
                devices: action.payload,
            }
        case Action.completeDevice:
            return {
                ...state,
                devices: [action.payload, ...state.devices],
            }
        default:
            return state;
    }
}
*/
export default reducer;