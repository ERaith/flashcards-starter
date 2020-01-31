const inquirer = require('inquirer');

async function asyncHelper(round, decks, game) {
  await choose(game);
  round = game.newRound(decks[game.currentRound]);
  await main(round, decks, game);
}

const genList = (round) => {
  let card = round.returnCurrentCard();
  let choices = card.answers.map((answer, index) => {
    return {
      key: index,
      value: answer
    }
  });
  return {
    type: 'rawlist',
    message: card.question,
    name: 'answers',
    choices: choices
  };
}

const getRound = (round) => {
  return Promise.resolve(round);
}

const confirmUpdate = (id, round) => {
  const feedback = round.takeTurn(id);
  return {
    name: 'feedback',
    message: `Your answer of ${id} is ${feedback}`
  }
}

async function main(round, decks, game) {
  const currentRound = await getRound(round);
  const getAnswer = await inquirer.prompt(genList(currentRound));
  const getConfirm = await inquirer.prompt(confirmUpdate(getAnswer.answers, round));

  if (!round.returnCurrentCard()) {
    round.endRound();
    game.nextRound();
  } else {
    main(round, decks, game);
  }
}

async function choose(game) {
  const currentGame = await getGame(game);
  const getDeckAnswer = await inquirer.prompt(genDeckList(currentGame));
  const getDeckConfirm = await inquirer.prompt(confirmDeck(getDeckAnswer.title, game));
}

const getGame = (game) => {
  return Promise.resolve(game);
}
const confirmDeck = (deckName, game) => {
  const deckIndex = game.getIndex(deckName);
  return {
    name: 'feedback',
    message: `Your chosen deck is ${JSON.stringify(deckName)}
          ----------------------------------------------------------- `
  }
}

const genDeckList = (game) => {
  let decks = game.deckList;
  let choices = decks.map((decks, index) => {
    return {
      key: index,
      value: game.deckList[index].name
    }
  });
  return {
    type: 'rawlist',
    message: 'Choose a Deck',
    name: 'title',
    choices: choices
  };
}



module.exports.main = main;
module.exports.choose = choose;
module.exports.asyncHelper = asyncHelper;
