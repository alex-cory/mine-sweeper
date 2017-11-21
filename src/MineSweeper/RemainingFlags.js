import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'


const RemainingFlags = observer(({ game }) => (
  <Container>
    Mines: {game.remainingFlags}
  </Container>
))

const Container = styled.div`
  grid-area: remaining-flags;
  display: grid;
  align-items: center;
  user-select: none;
`

export default inject('game')(RemainingFlags)
