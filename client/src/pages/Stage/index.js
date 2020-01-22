import React from 'react'
import Paladin from '../../components/Characters/Adventurers/Paladin';
import King from '../../components/Characters/Mobs/Wyverns/King';

const Stage = (props) => {
  return (    
    <div className="stage">
      <BattleGround>
        <Paladin />
        <King />
      </BattleGround>
    </div>
  );
}

export default Stage;
