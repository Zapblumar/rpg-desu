const Effect = require('../Effect');

class Ability {
  constructor({ name, manaCost }) {
    this.name = name;
    this.manaCost = manaCost;
  }

  apply(user) {
    if (this.manaCost && (user.mana == null || user.mana < this.manaCost)) {
      console.log(`${user.name} tries to use ${this.name} but doesn't have enough mana...`);
      return false;
    }
    user.mana -= this.manaCost;
    return true;
  }
}

class BasicAttack extends Ability {
  constructor() {
    super({ name: 'Basic Attack', manaCost: 0 });
  }
  apply(user, victim) {
    if (!super.apply(user)) console.log(`But whatever...`);

    const damage = Math.max(user.strength - victim.defense, 0);
    if (damage === 0) console.log(`${user.name}'s sword bounces off of ${victim.name}'s shield...`);
    else {
      victim.health -= damage;
      console.log(`${user.name} struck ${victim.name} for ${damage} damage.`);
    }
  }
}
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

module.exports = {
  BasicAttack,
  MageArmor,
  Shrink,
};
