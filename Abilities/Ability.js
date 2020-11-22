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

module.exports = Ability;
