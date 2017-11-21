import { observable, computed, reaction, action } from 'mobx'
import { flatten } from 'utils'
import Cell from './Cell'


export class GameStore {
  @observable mineCount = 10
  @observable rowCount = 8
  @observable time = 0
  @observable cellsFlagged = 0
  @observable cellGrid = [[]]
  @observable cells = []
  @observable status = 'playing' // or won or lost
  @computed get remainingFlags() {
    return this.mineCount - this.cellsFlagged
  }

  constructor() {
    this.startNewGame()
    reaction(
      () => this.status,
      () => {
        if (this.status === 'playing') return
        const message = this.status === 'lost' ? 'Try Again!' : 'Congratulations! You won!'
        alert(message)
        this.startNewGame()
      },
      { delay: 20 }
    )
    // when increasing or decreasing rowCount or difficulty, start a new game
    reaction(
      () => this.rowCount + this.mineCount,
      () => this.startNewGame()
    )
  }

  startTimer() {
    this.time = 1
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
    if (this.timer) this.resetTimer()
    this.status = 'playing'
    this.cellsFlagged = 0
    const minePositions = this.generateMinePositions()
    this.cellGrid = Array.from({ length: this.rowCount }, (_, y) => (
      Array.from({ length: this.rowCount }, (_, x) => {
        const position = [y, x]
        const isMine = Array.isArray(minePositions[position])
        return new Cell(this, x, y, isMine)
      })
    ))
    this.cells = flatten(this.cellGrid)
  }

  generateMinePositions() {
    const point = () => Math.floor(Math.random() * this.rowCount)
    let minePositions = {}
    while (Object.keys(minePositions).length < this.mineCount) {
      const position = [point(), point()]
      if (!minePositions[position]) {
        minePositions[position] = position
      }
    }
    return minePositions
  }

  displayMines() {
    for (const cell of this.cells) {
      if (cell.isMine) cell.isVisible = true
    }
  }

  @action.bound
  incrementMines() {
    const lessMinesThanCells = this.mineCount + 1 < this.cells.length
    if (lessMinesThanCells) {
      this.mineCount++
    } else {
      alert("You have to at least have one cell that's not a mine silly!")
    }
  }

  @action.bound
  decrementMines() {
    if (this.mineCount > 1) {
      this.mineCount--
    } else {
      alert("You have to have at least 1 mine silly!")
    }
  }

  @action.bound
  decrementRows() {
    const nextCellCount = Math.pow(this.rowCount - 1, 2)
    if (this.mineCount < nextCellCount) {
      this.rowCount--
    } else {
      alert("You can't have more mines than cells silly!")
    }
  }

  @action.bound
  incrementRows() {
    const maxRows = 24
    if (this.rowCount < maxRows) {
      this.rowCount++
    }
  }
}

const game = window.game = new GameStore()
export default game