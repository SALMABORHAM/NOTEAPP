import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NoteDeatilsComponent } from './pages/note-deatils/note-deatils.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';

const routes: Routes = [
   {path: '', component: MainLayoutComponent,  children:[
    {path: '',component: NotesListComponent},
    {path: 'new', component: NoteDeatilsComponent},
    {path: ':id', component: NoteDeatilsComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
