import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { StudentService } from '../../../core/service/student.service';
import { StudentRequestDTO } from '../../../core/models/student-request.dto';

@Component({
  selector: 'app-student-create',

  standalone: true,

  imports: [
    FormsModule
  ],

  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.css'
})
export class StudentCreateComponent {

  student: StudentRequestDTO = {
    firstName: '',
    lastName: '',
    email: ''
  };

  errorMessage = '';

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  createStudent(): void {

    this.studentService
      .create(this.student)
      .subscribe({

        next: () => {

          this.router.navigate([
            '/students'
          ]);

        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Erreur lors de la création';

        }

      });

  }
}