import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogEditData } from "../types/dialog";

@Component({
    selector: 'dialog-edit',
    templateUrl: 'dialog-edit.html',
})
  
export class DialogEdit {
    constructor(
        public dialogRef: MatDialogRef<DialogEdit>,
        @Inject(MAT_DIALOG_DATA) public data: DialogEditData,
    ) {}

    editForm = new FormGroup({
        title: new FormControl(this.data.title, [Validators.required]),
        description: new FormControl(this.data.description, [Validators.required])
    });

    onSubmit(): void {
        this.dialogRef.close(this.editForm.value);
    }
}