import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Note } from "../model/note";
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorHandlingService } from "./error-handling.service";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GetNotesService {
  private noteEdit = new BehaviorSubject<Note>({} as any);
  url = 'http://localhost:3000/note';

  constructor(private http: HttpClient, private errorHandling: ErrorHandlingService) { }

  getNotes(): Observable<Note[]>
  {
    return this.http.get<Note[]>(this.url).pipe(
      catchError(this.errorHandling.handleError<Note[]>('getAll', []))
    );
  }

  deleteNote(id: number): Observable<Note>
  {
    return this.http.delete<Note>(this.url + '/' + id).pipe(catchError(this.errorHandling.handleError<Note>('deleteNote')));
  }

  addNewNote(note: Note): Observable<Note>
  {
    return this.http.post<Note>(this.url, note).pipe(catchError(this.errorHandling.handleError<Note>('addNewNote')))
  }

  putEditNote(note: Note): Observable<Note>
  {
    return this.http.put<Note>(this.url + '/note', note).pipe(catchError(this.errorHandling.handleError<Note>('putEditNote')))
  }

  public init(note: Note): void
  {
    this.noteEdit.next(note); 
  }

  public getEditedNote(): Observable<Note>
  {
    return this.noteEdit.asObservable();
  }
}