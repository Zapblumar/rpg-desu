class Effect {
  constructor({ duration, health, strength, defense, completionMessage }) {
    this.duration = duration;
    this.health = { scalar: 1, offset: 0, ...health };
    this.strength = { scalar: 1, offset: 0, ...strength };
    this.defense = { scalar: 1, offset: 0, ...defense };
    this.completionMessage = completionMessage;
  }
}

module.exports = Effect;
