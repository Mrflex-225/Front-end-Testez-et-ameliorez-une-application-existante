describe('Student list page', () => {

  it('should display students', () => {

    // GIVEN : faux token valide
    const payload = {
      sub: 'john',
      exp: Math.floor(Date.now() / 1000) + 3600
    };

    const fakeJwt =
      'header.' +
      btoa(JSON.stringify(payload)) +
      '.signature';

    // GIVEN : mock de l'API
    cy.intercept(
      'GET',
      '**/api/students',
      {
        statusCode: 200,
        body: [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@test.com'
          },
          {
            id: 2,
            firstName: 'Jane',
            lastName: 'Martin',
            email: 'jane@test.com'
          }
        ]
      }
    ).as('getStudents');

    // On ouvre d'abord une page et on met le token
    cy.visit('/login', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'token',
          fakeJwt
        );
      }
    });

    // WHEN
    cy.visit('/students');

    cy.wait('@getStudents');

    // THEN
    cy.contains('John')
      .should('be.visible');

    cy.contains('Doe')
      .should('be.visible');

    cy.contains('Jane')
      .should('be.visible');

    cy.contains('Martin')
      .should('be.visible');

    cy.contains('john@test.com')
      .should('be.visible');

    cy.contains('jane@test.com')
      .should('be.visible');
  });

});