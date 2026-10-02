import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { StudentService } from '../../../core/service/student.service';
import { StudentResponseDTO } from '../../../core/models/student-response.dto';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  students:StudentResponseDTO[] = [];
  errorMessage = '';
  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAll().subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage =
          'Impossible de récupérer les étudiants';
      }
    });
  }

  deleteStudent(id: number): void {
    const confirmation =
      confirm('Voulez-vous supprimer cet étudiant ?');
    if (!confirmation) {
      return;
    }
    this.studentService.delete(id).subscribe({
      next: () => {
        this.students =
          this.students.filter(
            student => student.id !== id
          );
      },
      error: (error) => {
        console.error(error);
        this.errorMessage =
          'Erreur lors de la suppression';
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token'); 
    
    this.router.navigate(['/login']);
  }
}