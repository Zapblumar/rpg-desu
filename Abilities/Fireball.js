const Ability = require('./Ability');

class Fireball extends Ability {
    constructor() {
        super({ name: 'Fireball', manaCost: 5 });
    }
    apply(user, victim) {
        if (!super.apply(user)) return;

        const damage = Math.floor(50);
        victim.health -= damage;
        console.log(`${user.name} burned ${victim.name} for ${damage} damage.`);
    }
}


module.exports = Fireball;