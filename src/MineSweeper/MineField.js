import React from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import Cell from './Cell'


const MineField = observer(({ game: { cells } }) => (
  <Field>
    {cells.map((cell, i) => (
      <Cell cell={cell} key={i} />
    ))}
  </Field>
))

const Field = styled.div`
  grid-area: mine-field;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`

export default inject('game')(MineField)