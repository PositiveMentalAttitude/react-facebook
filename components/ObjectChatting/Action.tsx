import * as React from 'react';

var AppDispatcher = require('./AppDispatcher');
var ActionConstant = require('./ActionConstant');

export class Action {

    createMessage(text) {
        AppDispatcher.dispatch({
            type: ActionConstant.CREATE_MESSAGE,
            data: text
        });
    }

    changeObjectStatus(e) {
        AppDispatcher.dispatch({
            type: ActionConstant.CHANGE_OBJECT_STATE,
            data: e
        });
    }
}