import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { PlusIcon, MinusIcon } from 'components'


const Difficulty = observer(({ game }) => (
  <Row>
    <MinusIcon onClick={game.decrementMines} />
    Mines
    <PlusIcon onClick={game.incrementMines} />
  </Row>
))

const Row = styled.div`
  grid-area: difficulty;
  display: flex;
  flex-direction: row;
  width: 50%;
  justify-content: space-between;
  align-items: center;
  background: rgba(0,0,0,.65);
  border-radius: 0 0 12px 12px;
  color: white;
  padding: 4px;
  font-family: helvetica;
  font-size: 14px;
  user-select: none;
  margin-top: 1px;
`

export default inject('game')(Difficulty)