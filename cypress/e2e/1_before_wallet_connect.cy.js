/// <reference types="cypress" />

describe('tx-crypto', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  describe('header', () => {
    it('displays wallet button', () => {
      cy.get('header button.iekbcc0').should('have.length', 1)
      cy.get('header button.iekbcc0').should('have.text', 'Connect Wallet')
    })
  })
  describe('main', () => {
    it('displays h1', () => {
      cy.get('h1').should('have.length', 1)
      cy.get('h1').should('have.text', 'Tx crypto')
    })
    it('displays h2', () => {
      cy.get('h2').should('have.length', 1)
      cy.get('h2').should(
        'have.text',
        'Transactions history comes from Polygonscan'
      )
    })
    it('displays h3', () => {
      cy.get('h3').should('have.length', 1)
      cy.get('h3').should(
        'have.text',
        'This page only works only on the Polygon Mumbai Testnet'
      )
    })
    it('displays info', () => {
      cy.get('main p').should('have.length', 1)
      cy.get('main p').should('have.text', 'Wallet not connected')
    })
  })
  describe('footer', () => {
    it('displays project name and current year', () => {
      cy.get('footer p').should('have.length', 1)
      cy.get('footer p').should('have.text', '© Copyright Tx crypto 2022')
    })
  })
})
