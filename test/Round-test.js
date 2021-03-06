const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Round = require('../src/Round');
const Turn = require('../src/Turn');


describe('Round', function() {

  it('should be a function', function() {
    const deck = new Round();
    expect(Round).to.be.a('function');
  });

  it('should be an instance of Round', function() {
    const round = new Round();
    expect(round).to.be.an.instanceof(Round);
  });

  let card1;
  let card2;
  let card3;
  let deck;
  let round;
  beforeEach(function() {
    card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    card3 = new Card(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');
    deck = new Deck([card1, card2, card3]);
    round = new Round(deck);
  })

  it('should have a deck for the round', function() {
    expect(round.deck).to.be.a('object');
  });

  it('should keep track of the current card in play', function() {

    expect(round.currentCard()).to.deep.equal(card1);
  });

  it('should be able to take a turn', function() {
    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');

    expect(round.takeTurn('sea otter')).to.equal('Correct!')
    expect(round.takeTurn('spleen')).to.equal('Incorrect!')
  });

  it('should keep track of turns', function() {

    round.takeTurn('sea otter');
    round.takeTurn('spleen')
    expect(round.turn).to.equal(2);
  });

  it('should be able to calculate the Percent Correct', function() {

    round.takeTurn('sea otter');
    round.takeTurn('spleen')
    expect(round.calculatePercentCorrect()).to.equal(50);

  });

});
