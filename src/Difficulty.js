import React from 'react'
import { observer, inject } from 'mobx-react'
import { PlusIcon, MinusIcon, ControlBox } from 'components'


const Difficulty = observer(({ game }) => (
  <Container>
    <MinusIcon onClick={game.decrementMines} />
    Mines
    <PlusIcon onClick={game.incrementMines} />
  </Container>
))

const Container = ControlBox.extend`
  grid-area: difficulty;
  border-radius: 0 0 12px 12px;
  margin-top: 1px;
`

export default inject('game')(Difficulty)