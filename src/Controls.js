import React from 'react'
import { observer, inject } from 'mobx-react'
import { PlusIcon, MinusIcon, SadFaceIcon, SmileyFaceIcon, ControlBox } from 'components'


const Controls = observer(({ game }) => (
  <Container>
    <MinusIcon onClick={game.decrementRows} />
    <Face onClick={game.startNewGame} sad={game.status === 'lost'} />
    <PlusIcon onClick={() => game.rows++} />
  </Container>
))

const Face = ({ sad, ...props }) => sad ? <SadFaceIcon {...props} /> : <SmileyFaceIcon {...props} />

const Container = ControlBox.extend`
  grid-area: controls;
  border-radius: 12px 12px 0 0;
  margin-bottom: 1px;
`

export default inject('game')(Controls)
