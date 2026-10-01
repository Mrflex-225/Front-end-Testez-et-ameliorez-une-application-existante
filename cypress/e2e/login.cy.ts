describe('Login page', () => {

  it('should login successfully', () => {

    // GIVEN
    const payload = {
      sub: 'john',
      exp: Math.floor(Date.now() / 1000) + 3600
    };

    const fakeJwt =
      'header.' +
      btoa(JSON.stringify(payload)) +
      '.signature';

    cy.intercept(
      'POST',
      '**/api/login',
      {
        statusCode: 200,
        body: fakeJwt
      }
    ).as('login');

    cy.visit('/login');

    // WHEN
    cy.get('input[name="login"]')
      .type('john');

    cy.get('input[name="password"]')
      .type('password');

    cy.get('button[type="submit"]')
      .click();

    // THEN
    cy.wait('@login');

    cy.window()
      .its('localStorage')
      .invoke('getItem', 'token')
      .should('eq', fakeJwt);

    cy.url()
      .should('include', '/students');
  });

});