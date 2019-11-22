import { createAction, props } from '@ngrx/store';
import { GlobalMessage } from 'src/app/models/global-message.model';


export const showGlobalMessage = createAction(
    "[Global Message] Show Global Message",
    props<{ message: GlobalMessage }>()
)

export const closeGlobalMessage = createAction(
    "[Global Message] Close Global Message"
);
