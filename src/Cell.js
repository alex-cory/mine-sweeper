import React from 'react'
import styled, { css } from 'styled-components'
import { observer } from 'mobx-react'
import { FlagIcon, MineIcon } from 'components'


const Cell = observer(({ cell: { reveal, flag, game, isMine, isVisible, isFlagged, isClickedMine, value } }) => (
  <Container
    onClick={reveal}
    onContextMenu={flag}
    rows={game.rows}
    isVisible={isVisible}
    isFlagged={isFlagged}
    isIncorrectlyFlagged={isFlagged && !isMine && game.status === 'lost'}
    isClickedMine={isClickedMine}
  >
    {isFlagged ? (
      <FlagIcon />
    ) : isMine && isVisible ? (
      <MineIcon />
    ) : value > 0 && isVisible ? (
      <Number>{value}</Number>
    ) : null}
  </Container>
))

const Container = styled.div`
  grid-area: cell;
  ${({ rows, isVisible, isFlagged, isIncorrectlyFlagged, isClickedMine }) => css`
    width: calc(${100/rows}% - 2px);
    height: calc(${100/rows}% - 2px);
    background: rgba(${
      isClickedMine ? '250, 110, 130, .65'
      : isVisible || isFlagged ? '250, 250, 250, .65'
      : '0, 0, 0, .65'
    });
    ${isIncorrectlyFlagged && css`
      &:before {
        content: '✕';
        color: red;
        position: absolute;
        font-size: 22px;
      }
    `}
  `}
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1px;
`

const colors = {
  '1': 'blue',
  '2': 'green',
  '3': 'red',
  '4': 'purple',
  '5': 'maroon',
  '6': 'turquoise',
  '7': 'black',
  '8': 'gray'
}
const Number = styled.div`
  color: ${props => colors[props.children]};
`

export default Cell
