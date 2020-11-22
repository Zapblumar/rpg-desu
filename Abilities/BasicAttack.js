const Ability = require('./Ability');

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

module.exports = BasicAttack;
