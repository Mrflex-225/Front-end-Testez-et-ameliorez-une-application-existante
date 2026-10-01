import { TestBed } from '@angular/core/testing';

import {
  provideHttpClient
} from '@angular/common/http';

import {
  provideHttpClientTesting,
  HttpTestingController
} from '@angular/common/http/testing';

import { StudentService } from './student.service';

describe('StudentService', () => {

  let service: StudentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        StudentService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service =
      TestBed.inject(StudentService);

    httpMock =
      TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  test('should get all students', () => {

    const students = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com'
      }
    ];

    service.getAll().subscribe(result => {

      expect(result).toEqual(students);

    });

    const request =
      httpMock.expectOne('/api/students');

    expect(
      request.request.method
    ).toBe('GET');

    request.flush(students);
  });

  test('should get student by id', () => {

    const student = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com'
    };

    service.getById(1).subscribe(result => {

      expect(result).toEqual(student);

    });

    const request =
      httpMock.expectOne('/api/students/1');

    expect(
      request.request.method
    ).toBe('GET');

    request.flush(student);
  });

  test('should create student', () => {

    const requestDTO = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com'
    };

    const responseDTO = {
      id: 1,
      ...requestDTO
    };

    service.create(requestDTO)
      .subscribe(result => {

        expect(result)
          .toEqual(responseDTO);

      });

    const request =
      httpMock.expectOne('/api/students');

    expect(
      request.request.method
    ).toBe('POST');

    request.flush(responseDTO);
  });

  test('should update student', () => {

    const dto = {
      firstName: 'Jean',
      lastName: 'Martin',
      email: 'jean@test.com'
    };

    service.update(1, dto)
      .subscribe();

    const request =
      httpMock.expectOne('/api/students/1');

    expect(
      request.request.method
    ).toBe('PUT');

    request.flush({
      id: 1,
      ...dto
    });
  });

  test('should delete student', () => {

    service.delete(1)
      .subscribe();

    const request =
      httpMock.expectOne('/api/students/1');

    expect(
      request.request.method
    ).toBe('DELETE');

    request.flush(null);
  });
});