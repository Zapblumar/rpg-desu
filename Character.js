class Character {
  constructor({ name, health, strength, defense, mana, abilities }) {
    this.name = name;
    this.rawHealth = health;
    this.rawStrength = strength;
    this.rawDefense = defense;
    this.mana = mana;
    this.effects = [];
    this.abilities = abilities;
  }

  get health() {
    return this.effects.reduce(
      (health, { health: { scalar, offset } }) => scalar * health + offset,
      this.rawHealth
    );
  }

  set health(value) {
    this.rawHealth = this.effects
      .reverse()
      .reduce((value, { health: { scalar, offset } }) => (value - offset) / scalar, value);
  }

  get strength() {
    return this.effects.reduce(
      (strength, { strength: { scalar, offset } }) => scalar * strength + offset,
      this.rawStrength
    );
  }

  get defense() {
    return this.effects.reduce(
      (defense, { defense: { scalar, offset } }) => scalar * defense + offset,
      this.rawDefense
    );
  }

  get isAlive() {
    return this.health > 0;
  }

  useAbility(index, victim) {
    if (index < 0) {
      console.log(`${this.name} is cocky and decided to do nothing.`);
      return;
    }
    this.abilities[index].apply(this, victim);
  }

  reduceEffectDurations(amount = 1) {
    this.effects.forEach((effect) => (effect.duration -= amount));
  }

  filterEffects() {
    this.effects = this.effects.filter((effect) => {
      if (effect.duration > 0) return true;
      console.log(effect.completionMessage);
    });
  }

  toString() {
    return `Character<${this.name}, HP:${this.health}, MP:${this.mana}, STR:${this.strength}, DEF:${this.defense}>`;
  }
}

module.exports = Character;
