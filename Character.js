class Character {
  constructor({
    name,
    characterClass,
    bonusStats: { health, mana, strength, defense } = {},
    bonusAbilities = [],
  }) {
    this.name = name;
    this.stats = {
      maxHealth: characterClass.generateStat('health') + (health ?? 0),
      maxMana: characterClass.generateStat('health') + (mana ?? 0),
      strength: characterClass.generateStat('strength') + (strength ?? 0),
      defense: characterClass.generateStat('defense') + (defense ?? 0),
    };
    this._health = this.stats.maxHealth;
    this.mana = this.stats.maxHealth;
    this.abilities = characterClass.abilities.concat(bonusAbilities);
    this.effects = [];
  }

  get health() {
    return this.effects.reduce(
      (health, { health: { scalar, offset } }) => scalar * health + offset,
      this._health
    );
  }

  set health(value) {
    this._health = this.effects
      .reverse()
      .reduce((value, { health: { scalar, offset } }) => (value - offset) / scalar, value);
  }

  get strength() {
    return this.effects.reduce(
      (strength, { strength: { scalar, offset } }) => scalar * strength + offset,
      this.stats.strength
    );
  }

  get defense() {
    return this.effects.reduce(
      (defense, { defense: { scalar, offset } }) => scalar * defense + offset,
      this.stats.defense
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

  updateEffects(dt = 1) {
    this.effects = this.effects.filter((effect) => {
      effect.duration -= dt;
      if (effect.duration > 0) return true;
      console.log(effect.completionMessage);
    });
  }

  toString() {
    return `Character<${this.name}, HP:${this.health}, MP:${this.mana}, STR:${this.strength}, DEF:${this.defense}>`;
  }
}

module.exports = Character;
