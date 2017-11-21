import React from 'react';
import styled from 'styled-components'
import RemainingFlags from './RemainingFlags'
import Controls from './Controls'
import Timer from './Timer'
import MineField from './MineField'
import Difficulty from './Difficulty';


export const MineSweeper = () => (
  <Game>
    <RemainingFlags />
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
    'remaining-flags  controls       timer'
    'mine-field      mine-field mine-field'
    '............... difficulty ..........';
  justify-items: center;
  height: 460px;
  width: 400px;
  @media(max-width: 500px) {
    grid-template-columns: 22% 56% 22%;
    height: 360px;
    width: 300px;
  }
`
