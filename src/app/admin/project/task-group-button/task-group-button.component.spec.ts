import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGroupButtonComponent } from './task-group-button.component';

describe('TaskGroupButtonComponent', () => {
  let component: TaskGroupButtonComponent;
  let fixture: ComponentFixture<TaskGroupButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskGroupButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskGroupButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
