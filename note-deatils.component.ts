import { Component , OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/shared/note.module';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-deatils',
  templateUrl: './note-deatils.component.html',
  styleUrls: ['./note-deatils.component.scss']
})
export class NoteDeatilsComponent  implements OnInit {
  note!: Note;
  noteId!: number;
  new: any;
constructor(private notesService: NotesService, private router: Router, private route: ActivatedRoute){ }

ngOnInit() {
  this.route.params.subscribe((params: Params )=>{
    this.note = new Note();
    if(params['id']) {
      this.note = this.notesService.get(params['id']);
      this.noteId = params['id'];
    } 
  })
}

onSubmit(form:  NgForm){
  if(this.new) {
  // console.log(form);
  this.notesService.add(form.value);
  // this.router.navigateByUrl('/');
} else{
  this.notesService.update(this.noteId,form.value.title, form.value.body);
}
this.router.navigateByUrl('/');
}
cancel() {
  this.router.navigateByUrl('/');

}
}
