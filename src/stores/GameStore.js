import { observable, computed, reaction, action } from 'mobx'
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
          alert('Congratulations! You won!')
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
      () => this.rows + this.mines,
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

  @action.bound
  startNewGame() {
    this.status = 'playing'
    if (this.timer) {
      this.resetTimer()
    }
    const minePositions = this.generateMinePositions()
    this.cells = Array.from({ length: this.rows }, (_, y) => (
      Array.from({ length: this.rows }, (_, x) => {
        const position = [y, x]
        const isMine = Array.isArray(minePositions[position])
        return new Cell(this, x, y, isMine)
      })
    ))
  }

  generateMinePositions() {
    const point = () => Math.floor(Math.random() * this.rows)
    let minePositions = {}
    while (Object.keys(minePositions).length < this.mines) {
      const position = [point(), point()]
      if (!minePositions[position]) {
        minePositions[position] = position
      }
    }
    return minePositions
  }

  displayMines() {
    const cells = flatten(this.cells)
    for (const cell of cells) {
      if (cell.isMine) {
        cell.isVisible = true
      }
    }
  }

  @action.bound
  incrementMines() {
    const lessMinesThanCells = this.mines + 1 < flatten(this.cells).length
    if (lessMinesThanCells) {
      this.mines++
    } else {
      alert("You have to at least have one cell that's not a mine silly!")
    }
  }

  @action.bound
  decrementMines() {
    if (this.mines > 1) {
      this.mines--
    } else {
      alert("You have to have at least 1 mine silly!")
    }
  }

  @action.bound
  decrementRows() {
    const nextCellCount = Math.pow(this.rows - 1, 2)
    if (this.mines < nextCellCount) {
      this.rows--
    } else {
      alert("You can't have more mines than cells silly!")
    }
  }

  @action.bound
  incrementRows() {
    const maxRows = 24
    if (this.rows < maxRows) {
      this.rows++
    }
  }

}

const game = window.game = new GameStore()
export default game