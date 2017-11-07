import React from 'react';
import styled from 'styled-components'
import Score from './Score'
import Controls from './Controls'
import Timer from './Timer'
import MineField from './MineField'


export const MineSweeper = () => (
  <Game>
    <Score />
    <Controls />
    <Timer />
    <MineField />
  </Game>
)

const Game = styled.div`
  display: grid;
  grid-template-columns: 15% 70% 15%;
  grid-template-rows: 30px 1fr;
  grid-template-areas:
    'score       controls       timer'
    'mine-field mine-field mine-field';
  justify-items: center;
  height: 400px;
  width: 400px;
`
