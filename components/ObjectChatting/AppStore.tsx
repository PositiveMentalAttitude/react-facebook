var AppDispatcher = require('./AppDispatcher');
import {EventEmitter} from 'events';
var ActionConstant = require('./ActionConstant');

export var CHANGE_EVENT = "change";
export var OBJECT_CHANGE_EVENT = "object-change";

export var storeMessage = [];
export var objectState = 0;

function createMessage(e) {
    console.log("In createMessage")
    storeMessage.push(e);
}

function changeObjectStatus(status) {
    if (status.indexOf("1") !== -1) {
        objectState = 1;
    } else if (status.indexOf("2") !== -1) {
        objectState = 2;
    } else {
        objectState = 3;
    }
}

export var todoStore = new EventEmitter();

AppDispatcher.register(action => {

    switch (action.type) {
        case ActionConstant.CREATE_MESSAGE:
            var message = action.data.trim();
            createMessage(message);
            todoStore.emit(CHANGE_EVENT);
            break;
        case ActionConstant.CHANGE_OBJECT_STATE:
            changeObjectStatus(action.data);
            todoStore.emit(OBJECT_CHANGE_EVENT);
        default:
            break;
    }
});
