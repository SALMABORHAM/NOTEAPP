import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDeatilsComponent } from './note-deatils.component';

describe('NoteDeatilsComponent', () => {
  let component: NoteDeatilsComponent;
  let fixture: ComponentFixture<NoteDeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteDeatilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
