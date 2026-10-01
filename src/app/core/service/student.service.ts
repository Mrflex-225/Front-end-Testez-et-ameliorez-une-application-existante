import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StudentRequestDTO } from '../models/student-request.dto';
import { StudentResponseDTO } from '../models/student-response.dto';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly apiUrl =
    '/api/students';

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<StudentResponseDTO[]> {

    return this.http.get<StudentResponseDTO[]>(
      this.apiUrl
    );
  }

  getById(id: number): Observable<StudentResponseDTO> {

    return this.http.get<StudentResponseDTO>(
      `${this.apiUrl}/${id}`
    );
  }

  create(
    student: StudentRequestDTO
  ): Observable<StudentResponseDTO> {

    return this.http.post<StudentResponseDTO>(
      this.apiUrl,
      student
    );
  }

  update(
    id: number,
    student: StudentRequestDTO
  ): Observable<StudentResponseDTO> {

    return this.http.put<StudentResponseDTO>(
      `${this.apiUrl}/${id}`,
      student
    );
  }

  delete(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}