import {
  Component,
  OnInit
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { StudentService } from '../../../core/service/student.service';
import { StudentRequestDTO } from '../../../core/models/student-request.dto';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.css'
})
export class StudentEditComponent implements OnInit {
  id!: number;
  student: StudentRequestDTO = {
    firstName: '',
    lastName: '',
    email: ''
  };
  errorMessage = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}
  ngOnInit(): void {
    this.id =
      Number(
        this.route.snapshot.paramMap.get('id')
      );
    this.studentService
      .getById(this.id)
      .subscribe({
        next: (student) => {
          this.student = {
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email
          };
        },
        error: (error) => {
          console.error(error);
          this.errorMessage =
            'Impossible de récupérer l’étudiant';
        }
      });
  }
  updateStudent(): void {
    this.studentService
      .update(
        this.id,
        this.student
      )
      .subscribe({
        next: () => {
          this.router.navigate([
            '/students',
            this.id
          ]);
        },
        error: (error) => {
          console.error(error);
          this.errorMessage =
            'Erreur lors de la modification';
        }
      });

  }
}