import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGroupActionComponent } from './task-group-action.component';

describe('TaskGroupActionComponent', () => {
  let component: TaskGroupActionComponent;
  let fixture: ComponentFixture<TaskGroupActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskGroupActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskGroupActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
