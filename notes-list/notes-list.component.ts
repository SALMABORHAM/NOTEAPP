import { Component,OnInit  ,ElementRef,  ViewChild } from '@angular/core';
import { Note } from 'src/app/shared/note.module';
import { NotesService } from 'src/app/shared/notes.service';
import { trigger,transition,style, animate, query, stagger  } from '@angular/animations';
// import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations:[
    trigger('itemAnim' ,[
      transition('void => *',[
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }),
        animate('50ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingLeft: '*',
          paddingRight: '*',
        })),
      animate(68)
      ]),
      transition('* => void',[
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        animate('120ms ease-out',style({
          transform: 'scale(0.68)',
          opacity: 0,
        })),

        animate('150ms', style({
          opacity: 0,
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
          'margin-bottom': '0',
        }))
      ])
    ]),

    trigger('listAnim', [
      transition('* => *', [
        query(':enter',[
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [
            animate('0.2s ease')
          ])
        ],{
          optional: true
        })
      ])
  ])
  ]
})
export class NotesListComponent implements OnInit {

  notes: Note[] = new Array<Note>();  
  filteredNotes: Note[] = new Array<Note>();
  // //

  // form!: FormGroup;
  // noteList: Note[] = [];

  // noteForm!: FormGroup;
  // editForm!: FormGroup;

  // //
  @ViewChild('filterInput') filterInputElRef!: ElementRef<HTMLInputElement>;

  
  constructor(private notesService: NotesService) { }

  ngOnInit() :void  { 
    this.notesService.getAll();

    // this.notes = this.notesService.getnotes();
     this.notesService.getAll();
 
  }
  deleteNote(note: Note) {
    let noteId = this.notesService.getId(note);
    this.notesService.delete(noteId);
    this.filter(this.filterInputElRef.nativeElement.value);
  }
  generateNoteURL(note: Note){
    let noteId = this.notesService.getId(note);
    return noteId;

  }

  filter(query: string){
    console.log(query)
    query = query.toLowerCase().trim();

    let allResults: Note[] = new Array<Note>();
    //split uo the search query into individual words
    let terms: string[] = query.split(' ');  //split on space
    //remove duplicate search terms
    terms = this.removeDuplicates(terms);
    
    terms.forEach(term => {
    let results: Note[] = this.relevantNotes(term);

      allResults = [...allResults, ...results]
    });
    // allResults will include duplicate notes
    // because a particular note can be the fresult of many search terms
    //but we don't want to show the same note multiple times on the UI 
    // so first must remove the duplicates 
    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;

    //no sort by relevancy
    this.sortByRelevancy(allResults);
  }
  removeDuplicates(arr: Array<any>)  : Array<any> {
    let uniqueResults: Set<any> = new Set<any>();
    arr.forEach(e => uniqueResults.add(e));

    return Array.from(uniqueResults);
  }


  relevantNotes(query: string|any[]) {
    let y: any
    if( query || (typeof query === 'string' && query.length === 0) ){
     y = query; 
   }
   let relevantNotes = this.notes.filter((note) => {
      console.log("return")
      if (note.title && note.title.toLowerCase().includes(y)) {
        return true;
      }
      if(note.desc && note.desc.toLowerCase().includes(y)){
        return true;
      }
      return false;
      
    })

    return relevantNotes;
  }



  // relevantNotes(query: string) : any {
  //   query = query.toLowerCase().trim();
  //   let relevantNotes = this.notes.filter(note => {
  //     if (note.title && note.title.toLowerCase().includes(query)){
  //       return true;
  //     }
  //     if(note.body && note.body.toLowerCase().includes(query))
  //     return false;
  //   }) 
  //   return relevantNotes;
  // }



  sortByRelevancy(searchResults: Note[]) {
    let noteCountObj: any = {};

    searchResults.forEach(note => {
      let noteId = this.notesService.getId(note);
      
      if (noteCountObj.noteId) {
        noteCountObj[noteId] += 1;
      } else {
        noteCountObj[noteId] = 1;
      }
    })

    this.filteredNotes = this.filteredNotes.sort((a: Note, b: Note) => {
      let aId = this.notesService.getId(a);
      let bId = this.notesService.getId(b);


      let aCount = noteCountObj[aId];
      let bCount = noteCountObj[bId];

      return bCount - aCount;
    }) 
  }
}
