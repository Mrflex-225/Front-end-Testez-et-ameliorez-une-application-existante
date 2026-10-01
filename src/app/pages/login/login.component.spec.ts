import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { Router } from '@angular/router';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { UserService } from '../../core/service/user.service';
import { AuthService } from '../../core/service/auth.service';

describe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const userServiceMock = {
    login: jest.fn()
  };

  const authServiceMock = {
    setToken: jest.fn()
  };

  const routerMock = {
    navigate: jest.fn()
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent
      ],

      providers: [
        {
          provide: UserService,
          useValue: userServiceMock
        },
        {
          provide: AuthService,
          useValue: authServiceMock
        },
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    }).compileComponents();

    fixture =
      TestBed.createComponent(LoginComponent);

    component =
      fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component)
      .toBeTruthy();
  });

  it('should login and navigate to students', () => {

    // GIVEN
    component.loginRequest = {
      login: 'john',
      password: 'password'
    };

    userServiceMock.login
      .mockReturnValue(
        of('fake-token')
      );

    // WHEN
    component.login();

    // THEN
    expect(
      userServiceMock.login
    ).toHaveBeenCalledWith(
      component.loginRequest
    );

    expect(
      authServiceMock.setToken
    ).toHaveBeenCalledWith(
      'fake-token'
    );

    expect(
      routerMock.navigate
    ).toHaveBeenCalledWith([
      '/students'
    ]);
  });

});