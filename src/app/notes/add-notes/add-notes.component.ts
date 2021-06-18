import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Note } from '../../model/note';
import { GetNotesService } from '../../services/get-notes.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent implements OnInit {
  noteDescription = new FormControl();
  noteTitle = new FormControl();
  public title: string;
  public description: string;
  private deleteAnswer: boolean = false;

  constructor(private GetNotesService: GetNotesService,  public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  addNewNote()
  {
    if(this.title == '' || this.description === '')
    {
      console.log('puste');
      return false;
    }
    else
    {
      const dialogRef = this.dialog.open(DialogComponent,{
        width: '250px',
        data: {}
      });
      dialogRef.afterClosed().subscribe(result => 
      {
        this.deleteAnswer = result;
        if(this.deleteAnswer === true)
        {
          const newNote: Note = 
          {
            "id": 0,
            "title": this.title,
            "description": this.description
          }
          this.GetNotesService.addNewNote(newNote).subscribe(
            result => {
              console.log(result)
            },
            error => 
            {
              console.log(error);
            }
          )
          this.router.navigate(['/']);
        };
      });
      return true;
    }
  };
}
