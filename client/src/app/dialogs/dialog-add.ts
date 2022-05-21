import { Component, Inject } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { map, Observable, startWith } from "rxjs";
import { Song } from "../types/music";

@Component({
    selector: 'dialog-add',
    templateUrl: 'dialog-add.html'
})
  
export class DialogAdd {
    filteredOptions: Observable<Song[]>;
    songForm = new FormControl('', [Validators.required, SongSelectedValidator]);
    
    constructor(
        public dialogRef: MatDialogRef<DialogAdd>,
        @Inject(MAT_DIALOG_DATA) public songs: Song[],
    ) {
        this.filteredOptions = this.songForm.valueChanges.pipe(
            startWith(''),
            map(value => (typeof value === 'string' ? value : value.title)),
            map(title => (title ? this._filter(title) : this.songs.slice())),
          );
    }

    displaySong(song: Song): string {
        return song && song.title && song.artist_name ? 
                song.title + ' - ' + song.artist_name : '';
      }

    onSubmit(): void {
        this.dialogRef.close(this.songForm.value);
    }

    private _filter(searchTerm: string): Song[] {
        const filterValue = searchTerm.toLowerCase();
        return this.songs.filter(song => 
            song.title.toLowerCase().includes(filterValue) || 
            song.artist_name.toLowerCase().includes(filterValue));
    }
}

function instanceOfSong(song: any): song is Song {
    return !!song
    && typeof song !== 'string'
    && 'file' in song;
}

export const SongSelectedValidator: ValidatorFn = 
    (control: AbstractControl): ValidationErrors | null =>
		!instanceOfSong(control?.value) ? { matchRequired: true } : null;