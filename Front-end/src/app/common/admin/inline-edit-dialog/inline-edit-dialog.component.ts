import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

export interface DialogInputModel {
    id: number,
    name: string,
    value: number
}

@Component({
    selector: 'inline-edit-dialog',
    template: '<mat-form-field>' +
    '<input matInput [value]="this.data.name" (keyup)="onKey($event)" (keydown)="closeIfEnter($event)">' +
    '<button mat-button style="min-width: 100%;" (click)="save()">Valider</button>' +
    '</mat-form-field>'
})
export class InlineEditDialog {

    constructor(private dialogRef: MatDialogRef<InlineEditDialog>, @Inject(MAT_DIALOG_DATA) readonly data: DialogInputModel) {
    }

    onKey(event) {
        if (event.target.value !== '') {
            this.data.name = event.target.value;
        }
    }

    save() {
        this.dialogRef.close(this.data);
    }

    closeIfEnter(event: KeyboardEvent) {
        if (event.code === 'Enter' && this.data.name !== '') {
            this.save();
        }
    }
}