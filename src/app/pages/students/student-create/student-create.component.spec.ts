import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { Router } from '@angular/router';
import { of } from 'rxjs';

import { StudentCreateComponent } from './student-create.component';
import { StudentService } from '../../../core/service/student.service';

describe('StudentCreateComponent', () => {

  let component: StudentCreateComponent;
  let fixture: ComponentFixture<StudentCreateComponent>;

  const studentServiceMock = {
    create: jest.fn()
  };

  const routerMock = {
    navigate: jest.fn()
  };

  beforeEach(async () => {

    studentServiceMock.create
      .mockReturnValue(
        of({
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@test.com'
        })
      );

    await TestBed.configureTestingModule({
      imports: [
        StudentCreateComponent
      ],

      providers: [
        {
          provide: StudentService,
          useValue: studentServiceMock
        },
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    })
    .compileComponents();

    fixture =
      TestBed.createComponent(StudentCreateComponent);

    component =
      fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component)
      .toBeTruthy();
  });

});