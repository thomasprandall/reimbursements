describe('template spec', () => {
  it('find submit new request', () => {
    cy.visit('http://localhost:3000/requests')

    cy.contains('Submit new request').click()

    cy.url().should('include','?showAddRequestModal=1')

    cy.get('#reason').type('Fake Reason')

    cy.get('#amount').type('25.00')

    cy.get('#trans_date').type('2024-02-26')

    cy.contains('Save').click()
  })
})