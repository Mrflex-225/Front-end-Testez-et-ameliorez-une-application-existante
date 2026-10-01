describe('Student create page', () => {

  it('should create a student', () => {

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
      '**/api/students',
      {
        statusCode: 200,
        body: {
          id: 3,
          firstName: 'Jean',
          lastName: 'Martin',
          email: 'jean@test.com'
        }
      }
    ).as('createStudent');

    cy.visit('/login', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'token',
          fakeJwt
        );
      }
    });

    cy.visit('/students/new');

    cy.get('input[name="firstName"]')
      .type('Jean');

    cy.get('input[name="lastName"]')
      .type('Martin');

    cy.get('input[name="email"]')
      .type('jean@test.com');

    cy.contains('button', 'Ajouter')
      .click();

    cy.wait('@createStudent');
  });

});