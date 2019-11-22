import { MatSnackBarConfig } from '@angular/material/snack-bar';

export interface GlobalMessage {
    message: string;
    action?: string;
    config?: MatSnackBarConfig;
}
