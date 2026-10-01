// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import '@cypress/code-coverage/support'

import './commands';

// Capture de la couverture V8 native du navigateur sous Cypress
beforeEach(() => {
  // @ts-ignore
  cy.wrap(Cypress.automation('remote:debugger:protocol', {
    command: 'Profiler.enable'
  })).then(() => {
    // @ts-ignore
    cy.wrap(Cypress.automation('remote:debugger:protocol', {
      command: 'Profiler.startPreciseCoverage',
      args: { callCount: true, detailed: true }
    }));
  });
});

afterEach(() => {
  // @ts-ignore
  cy.wrap(Cypress.automation('remote:debugger:protocol', {
    command: 'Profiler.takePreciseCoverage'
  })).then((result) => {
    // Les données de couverture V8 sont récupérées ici et peuvent être formatées pour NYC
    window.localStorage.setItem('v8-coverage', JSON.stringify(result));
  });
});