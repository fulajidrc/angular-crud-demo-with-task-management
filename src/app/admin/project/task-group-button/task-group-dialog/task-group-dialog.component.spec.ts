import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGroupDialogComponent } from './task-group-dialog.component';

describe('TaskGroupDialogComponent', () => {
  let component: TaskGroupDialogComponent;
  let fixture: ComponentFixture<TaskGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskGroupDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
