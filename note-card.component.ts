import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
// onXButtonClick() {
// throw new Error('Method not implemented.');

  @Input() title!: string;
  @Input() body!: string;
  @Input() link!: any;

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('truncator') truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2){ }

  ngOnInit() {
  let style = window.getComputedStyle(this.bodyText.nativeElement,null);
  let ViewableHeight = parseInt(style.getPropertyValue("height"),10);

  if(this.bodyText.nativeElement.scrollHeight > ViewableHeight){
    this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
  } else {
    this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
  }
  }
  onXButtonClick() {
    this.deleteEvent.emit();
    
  }
}
