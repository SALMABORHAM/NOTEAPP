import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { NoteDeatilsComponent } from './pages/note-deatils/note-deatils.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    MainLayoutComponent,
    NoteCardComponent,
    NoteDeatilsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule, 
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
