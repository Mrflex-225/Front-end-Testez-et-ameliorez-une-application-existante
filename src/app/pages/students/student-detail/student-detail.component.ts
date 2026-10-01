import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { StudentService } from '../../../core/service/student.service';
import { StudentResponseDTO } from '../../../core/models/student-response.dto';
@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css'
})
export class StudentDetailComponent implements OnInit {
  student?: StudentResponseDTO;
  errorMessage = '';
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}
  ngOnInit(): void {
    const id =
      Number(
        this.route.snapshot.paramMap.get('id')
      );
    this.studentService
      .getById(id)
      .subscribe({
        next: (student) => {
          this.student = student;
        },
        error: (error) => {
          console.error(error);
          this.errorMessage =
            'Étudiant introuvable';
        }
      });
  }
}