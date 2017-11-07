import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'


const Score = observer(({ game }) => (
  <Container>
    {game.remainingMines}
  </Container>
))

const Container = styled.div`
  grid-area: score;
  display: grid;
  align-items: center;
`

export default inject('game')(Score)
