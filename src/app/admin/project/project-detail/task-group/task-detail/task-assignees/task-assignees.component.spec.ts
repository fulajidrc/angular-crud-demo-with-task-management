import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAssigneesComponent } from './task-assignees.component';

describe('TaskAssigneesComponent', () => {
  let component: TaskAssigneesComponent;
  let fixture: ComponentFixture<TaskAssigneesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskAssigneesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskAssigneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
