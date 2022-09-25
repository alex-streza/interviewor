describe('empty spec', () => {
  before(() => {
    cy.visit('/')
  })

  it('shows navigation', () => {
    cy.get('header').within(($header) => {
      cy.get('a').should('have.attr', 'href', '/')
      cy.get('button')
        .should('have.attr', 'href', '/#feature1')
        .contains('Features')
      cy.get('button').contains('Examples')
      cy.get('button').contains('Testimonials')
      cy.get('button').contains('Get started')
    })
  })

  it('shows hero', () => {
    cy.get('#hero').within(($header) => {
      cy.get('h1').contains('Imagine your perfect tech interview')
      cy.get('div').contains('Train & collaborate on over')
      cy.get('button').contains('Get started')
      cy.get('div').contains('No account required')
      cy.get('a').should('have.attr', 'href', 'https://liveblocks.io/')
    })
  })

  it('shows feature 1', () => {
    cy.get('#feature1').within(($header) => {
      cy.get('div').contains('For interviewees & interviewers alike')
      cy.get('h2').contains('Single app, Simple workflow')
      cy.get('div').contains(
        'No need for multiple apps and years of video editing knowledge, content within clicks.',
      )
    })
  })

  it('shows examples', () => {
    cy.get('#feature2').within(($header) => {
      cy.get('div').contains('Never run out of questions')
      cy.get('h2').contains('Over +')
      cy.get('div').contains('Train on over +')
    })

    cy.get('#feature3').within(($header) => {
      cy.get('div').contains('Interviews are cool now')
      cy.get('h2').contains('Take your coding interviews to a new level')
      cy.get('div').contains(
        'Share link with your interviewer and start explaining concepts you know in realtime & collaboratively.',
      )
      cy.get('button').contains('Share interview')
    })
  })

  it('shows testimonials', () => {
    cy.get('#testimonials').within(($header) => {
      cy.get('div').contains('Join the community')
      cy.get('h2').contains('Testimonials')
      cy.get('button').contains('GitHub')
      cy.get('button').contains('Twitter')
    })
  })

  it('shows get started', () => {
    cy.get('#get_started').within(($header) => {
      cy.get('h2').contains('Train for your next interview now')
      cy.get('div').contains('Train on over ')
      cy.get('button').contains('Get started')
      cy.get('div').contains('No account required')
    })
  })
})
