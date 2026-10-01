describe('Student edit page', () => {

  it('should update a student', () => {

    const payload = {
      sub: 'john',
      exp: Math.floor(Date.now() / 1000) + 3600
    };

    const fakeJwt =
      'header.' +
      btoa(JSON.stringify(payload)) +
      '.signature';

    cy.intercept(
      'GET',
      '**/api/students/1',
      {
        statusCode: 200,
        body: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@test.com'
        }
      }
    ).as('getStudent');

    cy.intercept(
      'PUT',
      '**/api/students/1',
      {
        statusCode: 200,
        body: {
          id: 1,
          firstName: 'Jean',
          lastName: 'Martin',
          email: 'jean@test.com'
        }
      }
    ).as('updateStudent');

    cy.visit('/login', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'token',
          fakeJwt
        );
      }
    });

    cy.visit('/students/1/edit');

    cy.wait('@getStudent');

    cy.get('input[name="firstName"]')
      .clear()
      .type('Jean');

    cy.get('input[name="lastName"]')
      .clear()
      .type('Martin');

    cy.get('input[name="email"]')
      .clear()
      .type('jean@test.com');

    cy.contains('button', 'Modifier')
      .click();

    cy.wait('@updateStudent');

    cy.url()
      .should('include', '/students');
  });

});