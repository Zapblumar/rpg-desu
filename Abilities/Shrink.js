const Ability = require('./Ability');
const Effect = require('../Effect');
class Shrink extends Ability {
  constructor() {
    super({ name: 'Shrink', manaCost: 1 });
  }
  apply(user, victim) {
    if (!super.apply(user)) return;
    if (victim.health > 20) {
      victim.effects.push(
        new Effect({
          duration: 5,
          strength: { scalar: 0.5 },
          defense: { scalar: 0.5 },
          completionMessage: `${victim.name} regrew in size...`,
        })
      );
      console.log(`${victim.name} is significantly diminished in size.`);
    } else console.log(`${user.name}'s spell fizzles doing nothing...`);
  }
}

module.exports = Shrink;
