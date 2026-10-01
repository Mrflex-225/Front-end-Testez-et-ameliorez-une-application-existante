import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  ActivatedRoute,
  provideRouter
} from '@angular/router';

import { of } from 'rxjs';

import { StudentListComponent }
  from './student-list.component';

import { StudentService }
  from '../../../core/service/student.service';
describe('StudentListComponent', () => {

  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;

  const studentServiceMock = {
    getAll: jest.fn(),
    delete: jest.fn()
  };

  beforeEach(async () => {

    studentServiceMock.getAll
      .mockReturnValue(
        of([
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@test.com'
          }
        ])
      );

    studentServiceMock.delete
      .mockReturnValue(
        of(void 0)
      );

    await TestBed.configureTestingModule({
      imports: [
        StudentListComponent
      ],

      providers: [
  {
    provide: StudentService,
    useValue: studentServiceMock
  },

  provideRouter([]),

  {
    provide: ActivatedRoute,
    useValue: {
      snapshot: {
        params: {},
        queryParams: {},
        fragment: null
      },
      params: of({}),
      queryParams: of({}),
      fragment: of(null)
    }
  }
]
    })
    .compileComponents();

    fixture =
      TestBed.createComponent(StudentListComponent);

    component =
      fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component)
      .toBeTruthy();
  });

});