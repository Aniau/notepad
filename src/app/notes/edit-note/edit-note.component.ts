import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Note } from '../../model/note';
import { GetNotesService } from '../../services/get-notes.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
// import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {
  noteDescription = new FormControl();
  noteTitle = new FormControl();
  public title: string;
  public description: string;
  public noteToEdit: Note;

  constructor(private GetNotesService: GetNotesService, public dialog: MatDialog) { }

  
  ngOnInit(): void 
  {
    this.GetNotesService.getEditedNote().subscribe(
      (noteEdit: Note)=>
      {
        this.noteToEdit = noteEdit;
        console.log(noteEdit);
      },
      error =>
      {
        console.log(error);
      })
  }

  saveEditNote()
  {
    const newNote: Note =
    {
      "id": this.noteToEdit.id,
      "title": this.noteToEdit.title,
      "description": this.noteToEdit.description

    }
    this.GetNotesService.putEditNote(newNote).subscribe(
      (result) => 
      {
        console.log(result)
      },
      (error) => 
      {
        console.log(error);
      });
  }

}
