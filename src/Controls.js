import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { PlusIcon, MinusIcon } from 'components'


const Controls = observer(({ game }) => (
  <Row>
    <PlusIcon onClick={() => game.rows++} />
    Mine Sweeper
    <MinusIcon onClick={() => game.rows--} />
  </Row>
))

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
`

export default inject('game')(Controls)
