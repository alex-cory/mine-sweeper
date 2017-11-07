import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { PlusIcon, MinusIcon, SadFaceIcon, SmileyFaceIcon } from 'components'


const Controls = observer(({ game }) => (
  <Row>
    <MinusIcon onClick={() => game.rows--} />
    <Face onClick={() => game.startNewGame()} sad={game.status === 'lost'} />
    <PlusIcon onClick={() => game.rows++} />
  </Row>
))

const Face = ({ sad, ...props }) => sad ? <SadFaceIcon {...props} /> : <SmileyFaceIcon {...props} />

const Row = styled.div`
  grid-area: controls;
  display: flex;
  flex-direction: row;
  width: 50%;
  justify-content: space-between;
  align-items: center;
  background: rgba(0,0,0,.65);
  border-radius: 12px 12px 0 0;
  color: white;
  padding: 4px;
  font-family: helvetica;
  font-size: 14px;
  margin-bottom: 1px;
  user-select: none;
`

export default inject('game')(Controls)
