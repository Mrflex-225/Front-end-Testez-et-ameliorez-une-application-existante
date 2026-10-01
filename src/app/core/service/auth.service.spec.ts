import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {

  let service: AuthService;

  beforeEach(() => {

    TestBed.configureTestingModule({});

    service = TestBed.inject(AuthService);

    localStorage.clear();
  });

  test('should save token', () => {

    service.setToken('test-token');

    expect(
      localStorage.getItem('token')
    ).toBe('test-token');
  });

  test('should return token', () => {

    localStorage.setItem(
      'token',
      'test-token'
    );

    expect(
      service.getToken()
    ).toBe('test-token');
  });

  test('should be authenticated when token is valid', () => {

  const payload = {
    sub: 'john',
    exp: Math.floor(Date.now() / 1000) + 3600
  };

  const token =
    'header.' +
    btoa(JSON.stringify(payload)) +
    '.signature';

  localStorage.setItem(
    'token',
    token
  );

  expect(
    service.isAuthenticated()
  ).toBe(true);
});

  test('should logout', () => {

    localStorage.setItem(
      'token',
      'test-token'
    );

    service.logout();

    expect(
      localStorage.getItem('token')
    ).toBeNull();
  });
});