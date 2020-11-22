const inquirer = require('inquirer');

const { Warrior } = require('./CharacterClasses');
const Character = require('./Character');
const { BasicAttack, MageArmor, Shrink } = require('./Abilities');

const getPlayerInfo = () => {
  return inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'What is your name?',
    filter: () => 'Timmy',
  });
};

const getPlayerAction = () => {
  return inquirer.prompt({
    type: 'list',
    name: 'abilityIndex',
    message: 'What ability would you like to use?',
    choices: player.abilities.map((ability, i) => ({ name: ability.name, value: i })),
  });
};

const getEnemyAction = () => {
  if (Math.random() < 0.2) return -1;
  return 0;
};

const loop = () => {
  return Promise.all([getPlayerAction(), getEnemyAction()]).then(
    ([{ abilityIndex: playerAction }, enemyAction]) => {
      if (Math.random() > 0.5) {
        player.useAbility(playerAction, orc);
        orc.useAbility(enemyAction, player);
      } else {
        orc.useAbility(enemyAction, player);
        player.useAbility(playerAction, orc);
      }
      player.updateEffects();
      orc.updateEffects();
      console.log(player.toString());
      console.log(orc.toString());
      if (player.isAlive && orc.isAlive) return loop();
    }
  );
};

let player;
const orc = new Character({
  name: 'Balethzar',
  characterClass: Warrior,
});
getPlayerInfo()
  .then(({ name }) => {
    player = new Character({
      name,
      characterClass: Warrior,
      bonusAbilities: [new MageArmor(), new Shrink()],
    });
    console.log(
      `${player.name} awakes butt-naked in the middle of an orc field. In the distance, ${player.name} sees a hulking figure sprinting full speed towards ${player.name}. It is ${orc.name}. Fight commence. ${player.name} rolls a nat 1 for initiative.`
    );
    return loop();
  })
  .then(() => {
    if (player.isAlive) {
      console.log("Timmy survived. This isn't possible.");
    } else {
      console.log('There is nothing left of timmy.');
    }
  });
