import React from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import { flatten } from 'utils'
import Cell from './Cell'


const MineField = observer(({ game: { cells } }) => (
  <Field>
    {flatten(cells).map((cell, i) => (
      <Cell cell={cell} key={i} />
    ))}
  </Field>
))

const Field = styled.div`
  grid-area: mine-field;
  display: flex;
  flex-flow: row wrap;
  border: 1px solid transparent;
  width: 100%;
`

export default inject('game')(MineField)