import { observable, computed, action, when } from 'mobx'
import { count } from 'utils'


export default class Cell {
  x = 0
  y = 0
  game = {} // game store
  @observable isVisible = false
  @observable isFlagged = false
  @observable isMine = false
  @observable isClickedMine = false
  @computed get value () { // '💣', 0-8
    if (this.isMine) return '💣'
    return count(this.neighbors, cell => cell.isMine)
  }
  @computed get neighbors() {
    const surroundingCellPositions = Object.values({
      topLeft: [-1, -1],
      top: [-1, 0],
      topRight: [-1, 1],
      right: [0, 1],
      bottomRight: [1, 1],
      bottom: [1, 0],
      bottomLeft: [1, -1],
      left: [0, -1]
    })
    return surroundingCellPositions
      .map(position => this.cellAt(position))
      .filter(neighbor => neighbor != null)
  }

  constructor(game, x, y, isMine) {
    this.game = game
    this.x = x
    this.y = y
    this.isMine = isMine
    when(
      () => this.isVisible,
      () => {
        if (this.value === 0) {
          this.fillNeighbors()
        }
      }
    )
  }

  @action.bound
  flag(e) {
    e.preventDefault()
    if ((!this.isVisible && this.game.remainingMines > 0) || this.isFlagged) {
      this.isFlagged = !this.isFlagged
    }
    if (this.game.allMinesFlagged && this.game.allCellsVisible) {
      this.game.status = 'won'
    }
  }

  @action.bound
  reveal() {
    if (this.isFlagged) return
    this.isVisible = true
    if (this.isMine) {
      this.isClickedMine = true
      this.game.displayMines()
      this.game.status = 'lost'
    }
    if (this.game.allMinesFlagged && this.game.allCellsVisible) {
      this.game.status = 'won'
    }
  }

  fillNeighbors() {
    for (var neighbor of this.neighbors) {
      if (!neighbor.isVisible) {
        neighbor.isVisible = true
      }
    }
  }

  cellAt([ relativeY, relativeX ]) {
    const y = this.y + relativeY
    const x = this.x + relativeX
    const outOfBounds = point => point >= this.game.rows || point < 0
    if (!outOfBounds(y) && !outOfBounds(x)) {
      return this.game.cells[y][x]
    }
  }
}
