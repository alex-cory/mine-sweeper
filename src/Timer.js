import React from 'react';
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'


const Timer = observer(({ game: { time } }) => (
  <Seconds>
    Time: {time}
  </Seconds>
))

const Seconds = styled.div`
  grid-area: timer;
  display: grid;
  align-items: center;
  user-select: none;
`

export default inject('game')(Timer)