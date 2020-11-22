const Ability = require('./Ability');
const Effect = require('../Effect');
class MageArmor extends Ability {
  constructor() {
    super({ name: 'Mage Armor', manaCost: 1 });
  }
  apply(user) {
    if (!super.apply(user)) return;
    if (user.health < 20) {
      user.effects.push(
        new Effect({
          duration: 2,
          defense: { offset: 300 },
          completionMessage: `${user.name}'s magic cloak vanished...`,
        })
      );
      console.log(`${user.name} is surrounded by a powerful, magic defensive cloak!`);
    } else console.log(`${user.name}'s spell fizzles doing nothing...`);
  }
}
module.exports = MageArmor;
