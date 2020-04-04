import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { FilterComponent } from './filter/filter.component';
import { NotesComponent } from './notes/notes.component';
import { NoteComponent } from './notes/note/note.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    FilterComponent,
    NotesComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
