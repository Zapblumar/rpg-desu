class CharacterClass {
  constructor({ name, stats: { health, mana, strength, defense } = {} }) {
    this.name = name;
    this.stats = {
      health: { min: 0, max: 0, ...health },
      mana: { min: 0, max: 0, ...mana },
      strength: { min: 0, max: 0, ...strength },
      defense: { min: 0, max: 0, ...defense },
    };
  }

  generateStat(statName) {
    if (this.stats[statName] == null) throw new Error('no such stat ' + statName);
    const min = this.stats[statName].min ?? 0;
    const max = this.stats[statName].min ?? 0;
    return min + Math.floor((max - min) * Math.random());
  }
}
module.exports = CharacterClass;
