import { observable, computed, reaction } from 'mobx'
import { count, flatten } from 'utils'
import Cell from './Cell'


class GameStore {
  @observable mines = 10
  @observable cells = []
  @observable status = 'playing' // 'playing', 'won', 'lost'
  @observable rows = 8
  @observable time = 0
  @computed get remainingMines() {
    const cells = flatten(this.cells)
    const cellsFlagged = count(cells, cell => cell.isFlagged)
    return this.mines - cellsFlagged
  }
  @computed get allMinesFlagged() {
    const mines = flatten(this.cells).filter(cell => cell.isMine)
    return mines.every(mine => mine.isFlagged)
  }
  @computed get allCellsVisible() {
    return flatten(this.cells)
      .filter(cell => !cell.isMine)
      .every(cell => cell.isVisible)
  }
  @computed get firstMoveMade() {
    const cells = flatten(this.cells)
    return count(cells, cell => cell.isVisible || cell.isFlagged) > 0
  }

  constructor() {
    this.startNewGame()
    reaction(
      () => this.status,
      () => {
        if (this.status === 'lost') {
          alert('Try again!')
          this.startNewGame()
        } else if (this.status === 'won') {
          alert('Congradulations! You won!')
          this.startNewGame()
        }
      },
      { delay: 20 }
    )
    reaction(
      () => this.firstMoveMade,
      () => {
        if (this.firstMoveMade) {
          this.startTimer()
        }
      }
    )
    // when increasing or decreasing rows or difficulty, start a new game
    reaction(
      () => this.rows,
      () => this.startNewGame()
    )
    // when increasing or decreasing the difficulty, start a new game
    reaction(
      () => this.mines,
      () => this.startNewGame()
    )
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.time += 1
    }, 1000);
  }

  resetTimer() {
    clearInterval(this.timer)
    this.time = 0
  }

  startNewGame() {
    this.status = 'playing'
    if (this.timer) {
      this.resetTimer()
    }
    const minePositions = this.generateMinePositions()
    this.cells = Array.from({ length: this.rows }, (_, y) => (
      Array.from({ length: this.rows }, (_, x) => {
        const position = minePositions[`${[y, x]}`]
        const isMine = Array.isArray(position)
        return new Cell(this, x, y, isMine)
      })
    ))
  }

  generateMinePositions() {
    const point = () => Math.floor(Math.random() * this.rows)
    return Array.from({ length: this.mines })
      .reduce(acc => {
        let position = [point(), point()]
        while (acc[`${position}`]) {
          position = [point(), point()]
        }
        acc[`${position}`] = position
        return acc
      }, {})
  }

  displayMines() {
    const cells = flatten(this.cells)
    for (const cell of cells) {
      if (cell.isMine) {
        cell.isVisible = true
      }
    }
  }
}

const game = window.game = new GameStore()
export default game