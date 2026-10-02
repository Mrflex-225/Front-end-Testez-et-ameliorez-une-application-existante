import { Routes } from '@angular/router';
import {RegisterComponent} from './pages/register/register.component';
import {AppComponent} from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { StudentDetailComponent } from './pages/students/student-detail/student-detail.component';
import { authGuard } from './core/guards/auth.guard';
import { StudentEditComponent } from './pages/students/student-edit/student-edit.component';
import { StudentCreateComponent } from './pages/students/student-create/student-create.component';
import { StudentListComponent } from './pages/students/student-list/student-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  }
  ,
 {
    path: 'login',
    component: LoginComponent
  },
   {
    path: 'students',
    component: StudentListComponent,
    canActivate: [
      authGuard
    ]
  },

  {
    path: 'students/new',
    component: StudentCreateComponent,
    canActivate: [
      authGuard
    ]
  },

  {
    path: 'students/:id/edit',
    component: StudentEditComponent,
    canActivate: [
      authGuard
    ]
  },

  {
    path: 'students/:id',
    component: StudentDetailComponent,
    canActivate: [
      authGuard
    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];
