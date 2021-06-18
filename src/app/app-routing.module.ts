import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNotesComponent } from './notes/add-notes/add-notes.component';
import { EditNoteComponent } from './notes/edit-note/edit-note.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  {
    path: '', component: NotesComponent
  },
  {
    path: 'add-notes', component: AddNotesComponent
  },
  {
    path: 'edit-note', component: EditNoteComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
