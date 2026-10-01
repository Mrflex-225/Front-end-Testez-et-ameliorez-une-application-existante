describe('Student delete', () => {

  it('should delete a student', () => {

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
      '**/api/students',
      {
        statusCode: 200,
        body: [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@test.com'
          }
        ]
      }
    ).as('getStudents');

    cy.intercept(
      'DELETE',
      '**/api/students/1',
      {
        statusCode: 204
      }
    ).as('deleteStudent');

    cy.visit('/login', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'token',
          fakeJwt
        );
      }
    });

    cy.visit('/students');

    cy.wait('@getStudents');

    cy.contains('John')
      .should('be.visible');

    cy.contains('button', 'Supprimer')
      .click();

    cy.wait('@deleteStudent');

  });

});