describe('Register page', () => {

  it('should register a user', () => {

    cy.intercept(
      'POST',
      '**/api/register',
      {
        statusCode: 200,
        body: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          login: 'john'
        }
      }
    ).as('register');

    cy.visit('/register');

    cy.get('input[name="firstName"]')
      .type('John');

    cy.get('input[name="lastName"]')
      .type('Doe');

    cy.get('input[name="login"]')
      .type('john');

    cy.get('input[name="password"]')
      .type('password');

    cy.contains('button', 'Register')
    .click();

    cy.wait('@register');
  });

});