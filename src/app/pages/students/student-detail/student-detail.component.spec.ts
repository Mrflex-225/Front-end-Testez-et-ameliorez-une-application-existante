import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StudentDetailComponent }
  from './student-detail.component';

import { StudentService }
  from '../../../core/service/student.service';

describe('StudentDetailComponent', () => {

  let component: StudentDetailComponent;
  let fixture: ComponentFixture<StudentDetailComponent>;

  const studentServiceMock = {
    getById: jest.fn()
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

    await TestBed.configureTestingModule({
      imports: [
        StudentDetailComponent
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
        }
      ]
    })
    .compileComponents();

    fixture =
      TestBed.createComponent(
        StudentDetailComponent
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