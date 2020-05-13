import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: 'confirm-dialog.component.html',
    styleUrls: ['confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

    static open(dialog: MatDialog, confirmed: () => void, canceled: () => void = () => {
    }) {
        const dialogRef = dialog.open(ConfirmDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                confirmed();
            } else {
                canceled();
            }
        });
    }
}
