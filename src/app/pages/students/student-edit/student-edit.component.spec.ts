import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { of } from 'rxjs';

import { StudentEditComponent }
  from './student-edit.component';

import { StudentService }
  from '../../../core/service/student.service';

describe('StudentEditComponent', () => {

  let component: StudentEditComponent;
  let fixture: ComponentFixture<StudentEditComponent>;

  const studentServiceMock = {
    getById: jest.fn(),
    update: jest.fn()
  };

  const routerMock = {
    navigate: jest.fn()
  };

  beforeEach(async () => {

    studentServiceMock.getById
      .mockReturnValue(
        of({
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@test.com'
        })
      );

    studentServiceMock.update
      .mockReturnValue(
        of({
          id: 1,
          firstName: 'Jean',
          lastName: 'Martin',
          email: 'jean@test.com'
        })
      );

    await TestBed.configureTestingModule({
      imports: [
        StudentEditComponent
      ],

      providers: [
        {
          provide: StudentService,
          useValue: studentServiceMock
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jest.fn()
                  .mockReturnValue('1')
              }
            }
          }
        },
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    })
    .compileComponents();

    fixture =
      TestBed.createComponent(
        StudentEditComponent
      );

    component =
      fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component)
      .toBeTruthy();
  });

});