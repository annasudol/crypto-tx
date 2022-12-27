/// <reference types="cypress" />

describe('tx-crypto', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    // cy.get('header button').click()
    // cy.get('[role="dialog"] .iekbcc0').contains('MetaMask').click()
  })

  it('displays transaction items', () => {
    cy.get('.tx-item').should('be.visible')
  })
  it('transaction items displays information', () => {
    cy.get('.tx-item').should('be.visible')
    cy.get('.tx-item').each(($el, index, $list) => {
      expect($el).contain('Hash')
      expect($el).contain('Date')
      expect($el).contain('From')
      expect($el).contain('Block Number')
      expect($el).contain('Nonce')
      expect($el).contain('a', 'View on Etherscan')
      $el
        .contain('a', 'View on Etherscan')
        .url()
        .should('contain', 'https://mumbai.polygonscan.com/tx/')
    })
  })
})
