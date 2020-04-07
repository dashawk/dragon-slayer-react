import React, { Component } from 'react'
import Commentary from './commentary';
import WinStatus from './winStatus';
import './style.css';
import Health from './health';

const initialState = {
  playerHealth: 100,
  dragonHealth: 100,
  playerWins: false,
  dragonWins: false,
  started: false,
  ended: false,
  giveUp: false,
  reset: false,
  turns: []
};

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = { ...initialState };
    this.user = JSON.parse(localStorage.getItem('user'));
    this.playerName = this.user.firstName + ' ' + this.user.lastName;
  }

  Play = () => {
    return (
      <div className="battle-ground">
        <div className="inner">
          <div className="column-player">
            <h2>{this.playerName}</h2>
            <Health hp={this.state.playerHealth} />
            <img src={require('../../assets/player.png')} alt={this.playerName} />
          </div>
          <div className="column-dragon">
            <h2>Dragon</h2>
            <Health hp={this.state.dragonHealth} />
            <img src={require('../../assets/dragon.png')} alt="Dragon" />
          </div>

          <div className="user-control">
            <button onClick={this.attack}>Attack</button>
            <button onClick={this.playerBlastAttack}>Blast Attack</button>
            <button onClick={this.heal}>Heal</button>
            <button onClick={this.giveUp}>Give Up</button>
            <button onClick={this.reset}>Reset</button>
          </div>
        </div>

        <div className="commentary-container">
          <Commentary turns={this.state.turns} reset={this.state.reset} />
        </div>
      </div>
    );
  };
  PlayNow = () => {
    return (
      <div>
        <h4 className="centered">Welcome {this.user.firstName + ' ' + this.user.lastName}</h4>
        <button className="centered m-5" onClick={this.start}>Play Now</button>
        <button className="centered m-5" onClick={this.logout}>Logout</button>
      </div>
    );
  };

  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    window.location.reload();
  };
  start = () => {
    this.setState({ started: true });
  };
  reset = () => {
    this.setState({ ...initialState, reset: true });
  };
  attack = () => {
    this.playerStartAttacking();
    if (this.winCheck()) {
      return;
    }
    this.dragonStartAttacking();
  };
  heal = () => {
    let { playerHealth, turns } = this.state;
    let healPoints;
    try {
      if (playerHealth < 100) {
        healPoints = this.generateDamage(1, 15);
        playerHealth += healPoints;

        if (playerHealth > 100) {
          playerHealth = 100;
        }

        turns.unshift(this.playerName + ' used heal and recovered ' + healPoints + ' health.');
        this.setState({ playerHealth, turns });
      } else {
        playerHealth = 100;
        turns.unshift(this.playerName + ' tried using heal but has no effect.');
      }
    } catch (e) { console.error(e); }

    // Dragon as the change to attack the player while healing
    setTimeout(() => this.dragonStartAttacking(), 500);
  };
  giveUp = () => {
    this.setState({
      giveUp: true,
      ended: true,
      playerWins: false
    });
  };

  playerStartAttacking = () => {
    // Max damage of 10
    let damage = this.generateDamage(1, 10);

    let { dragonHealth, turns } = this.state;

    dragonHealth -= damage;

    turns.unshift(this.playerName + ' attacked the Dragon and deals ' + damage + ' damage.');
    this.setState({ dragonHealth, turns });
  };

  playerBlastAttack = () => {
    // Max damage of 20
    let damage = this.generateDamage(5, 20);

    let { dragonHealth, turns } = this.state;

    dragonHealth -= damage;

    turns.unshift(this.playerName + ' used Blast attack to the Dragon and deals ' + damage + ' damage.');
    this.setState({ dragonHealth, turns });

    // Attack player with a powerful blow
    this.dragonStartAttacking(5, 20);
  };

  dragonStartAttacking = (min, max) => {
    // Max damage of 10
    let damage = this.generateDamage(1, 10);

    if (typeof min !== 'undefined' || typeof max !== 'undefined') {
      damage = this.generateDamage(min, max);
    }

    let { playerHealth, turns } = this.state;

    playerHealth -= damage;

    let log;

    const highDamage = [
      'Dragon delivered a heavy attack to ' + this.playerName + ' that deals ' + damage + ' damage which cracks the ground.',
      'Dragon attacked with his claws that deals ' + damage + ' damage which caused a bleeding effect.',
      'Dragon uses Thunder Strike and burns ' + this.playerName + ' and deals ' + damage + ' damage.'
    ];

    const mediumDamage = [
      'Dragon steps back and used whirlwind that pushes ' + this.playerName + ' back dealing ' + damage + ' damage.',
      'Dragon attacked ' + this.playerName + ' with his mighty hand and deals ' + damage + ' damage.',
      'Dragon draws fire breath to ' + this.playerName + ' and deals ' + damage + ' damage.'
    ];

    const lowDamage = [
      'Dragon poked and confuses ' + this.playerName + ' dealing ' + damage + ' damage.',
      'Dragon sweeps ' + this.playerName + ' that deals ' + damage + ' damage.',
      'Dragon uses booger attack that deals ' + damage + ' damage.'
    ];

    if (damage >= 10) {
      log = highDamage[Math.floor(Math.random() * 3)];
    } else if (damage > 5 && damage < 8) {
      log = mediumDamage[Math.floor(Math.random() * 3)];
    } else {
      log = lowDamage[Math.floor(Math.random() * 3)];
    }

    turns.unshift(log);
    this.setState({ playerHealth, turns });
    this.winCheck();
  };

  winCheck = () => {
    if (this.state.dragonHealth <= 0) {
      this.setState({ playerWins: true, dragonWins: false, ended: true });
      return true;
    } else if (this.state.playerHealth <= 0) {
      this.setState({ playerWins: false, dragonWins: true, ended: true });
      return true;
    }

    return false;
  };

  generateDamage(minDamage, maxDamage) {
    return Math.floor(Math.random() * maxDamage) + minDamage;
  }

  render() {
    return (
      <div className="game-container">

        {this.state.started ? this.Play() : this.PlayNow()}
        {this.state.ended ?
          <WinStatus
            won={this.state.playerWins}
            giveUp={this.state.giveUp}
            playAgain={this.reset} /> : ''
        }

        <div className="footer">Created by: Jason Panugaling</div>
      </div>
    );
  }
}

export default Game