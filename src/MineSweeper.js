import React from 'react';
import styled from 'styled-components'
import Score from './Score'
import Controls from './Controls'
import Timer from './Timer'
import MineField from './MineField'
import Difficulty from './Difficulty';


export const MineSweeper = () => (
  <Game>
    <Score />
    <Controls />
    <Timer />
    <MineField />
    <Difficulty />
  </Game>
)

const Game = styled.div`
  display: grid;
  grid-template-columns: 17% 66% 17%;
  grid-template-rows: 30px 1fr 30px;
  grid-template-areas:
    'score       controls       timer'
    'mine-field mine-field mine-field'
    '.......... difficulty ..........';
  justify-items: center;
  height: 460px;
  width: 400px;
`
