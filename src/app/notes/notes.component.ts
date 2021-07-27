import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Note } from '../model/note';
import { GetNotesService } from '../services/get-notes.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ThrowStmt } from '@angular/compiler';

export interface DialogData{
  id: number,
  title: string,
  description: string
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  public notes: Note[] = [];
  public id: number;
  public title: string;
  public description: string;
  public dialogEditTitle: string;
  public dialogEditDescription: string;
  public dialogEditId: number;
  public dialogAddTitle: string;
  public dialogAddDescription: string;
  public dialogAddId: number;
  private deleteAnswer: boolean = false;
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  // @ViewChild('callAPIDialog') callAPIDialogAdd: TemplateRef<any>;
  private url = 'http://localhost:3000/notes';

  constructor(private GetNotesService: GetNotesService,  public dialog: MatDialog, private router: Router) {

   }

  ngOnInit() 
  {
    this.GetNotesService.getNotes()
    .subscribe(
      result =>
    {
      console.log(result);
      // this.notes = result;
      // console.log(this.notes[2].title.length);
      for(let key of result)
      {
        console.log(key.title.length);
        let titleKey = key.title.length;
        let descriptionKey = key.description.length;
        if(titleKey > 17)
        {
          console.log(key.title.substring(0, 16)+'...');
        }
        if(descriptionKey > 100)
        {
          console.log(key.description.substring(0, 100)+'...');
        }
      }
      this.notes = result;
    },
    error => {
      console.log(error);
    });   
  }

  drop(event: CdkDragDrop<any>) 
  {
    this.notes[event.previousContainer.data.index]=event.container.data.note;
    this.notes[event.container.data.index]=event.previousContainer.data.note;
    
    console.log(event.previousContainer.data);

    // moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
    // console.log(event.previousIndex);
    // console.log(event);
  }

  deleteNote(id: number)
  {
    this.GetNotesService.deleteNote(id).subscribe(
    result => 
    {
      console.log(result)
    },
    (error) => 
    {
      console.log(error);
    });
    window.location.reload();
  }

  sendEditNote(note: Note)
  {
    const dialogRef = this.dialog.open(this.callAPIDialog);
    this.dialogEditId = note.id;
    this.dialogEditTitle = note.title;
    this.dialogEditDescription = note.description;

    dialogRef.afterClosed().subscribe(result => 
    {
      this.deleteAnswer = result;
        if(this.deleteAnswer === true)
        {
      const newNote: Note =
      {
        "id": this.dialogEditId,
        "title": this.dialogEditTitle,
        "description": this.dialogEditDescription
      }
      this.GetNotesService.putEditNote(newNote).subscribe(
      (result) => 
      {
        console.log(result)
        //window.location.reload();
      },
      (error) => 
      {
        console.log(error);
      });
    }
    },
    error =>
    {
      console.log(error);
    });
  }

  addNewNote(templateRef: TemplateRef<any>)
  {
    if(this.title == '' || this.description === '')
    {
      console.log('puste');
      return false;
    }
    else
    {
      const dialogRefAdd = this.dialog.open(templateRef);

      dialogRefAdd.afterClosed().subscribe(result => 
      {
        this.deleteAnswer = result;
        if(this.deleteAnswer === true)
        {
          const newNote: Note = 
          {
            "id": 0,
            "title": this.dialogAddTitle,
            "description": this.dialogAddDescription
          }
          console.log(this.dialogAddTitle);
          console.log(this.dialogAddDescription);
          this.GetNotesService.addNewNote(newNote).subscribe(
            result => {
              console.log(result);
              //window.location.reload();
            },
            error => 
            {
              console.log(error);
            }
          )
        };
      });
      return true;
    }
  };

  backWithoutSaving()
  {
    this.dialog.closeAll();
  }
  
}
