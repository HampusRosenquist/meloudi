import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'dialog-create',
    templateUrl: 'dialog-create.html',
})
  
export class DialogCreate {
    constructor(
        public dialogRef: MatDialogRef<DialogCreate>
    ) {}

    createForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        isPublic: new FormControl('', [Validators.required])
    });

    onSubmit(): void {
        this.dialogRef.close(this.createForm.value);
    }
}