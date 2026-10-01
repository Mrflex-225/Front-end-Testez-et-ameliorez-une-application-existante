describe('Student detail page', () => {

  it('should display student details', () => {

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

    cy.visit('/login', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'token',
          fakeJwt
        );
      }
    });

    cy.visit('/students/1');

    cy.wait('@getStudent');

    cy.contains('John')
      .should('be.visible');

    cy.contains('Doe')
      .should('be.visible');

    cy.contains('john@test.com')
      .should('be.visible');
  });

});