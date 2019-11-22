
import { createReducer, on } from '@ngrx/store';
import { GlobalMessageActions } from './global-message-action-types';
import { GlobalMessage } from 'src/app/models/global-message.model';

export interface GlobalMessageState {
    globalMessage: GlobalMessage;
}

export const initialGlobalMessageState: GlobalMessageState = {
    globalMessage: undefined,
};

export const globalMessageReducer = createReducer(
    initialGlobalMessageState,
    on(GlobalMessageActions.showGlobalMessage, (state, action) => {
        return {
            ...state,
            globalMessage: action.message
        }
    }),
    on(GlobalMessageActions.closeGlobalMessage, (state, action) => {
        return state;
    })
)
