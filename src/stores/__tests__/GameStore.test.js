import { GameStore } from '../GameStore'


describe('GameStore Test', () => {
  describe('On GameStore initial startup', () => {
    it('should have no timer, status of playing, 64 cells, and 10 mines', () => {
      const game = new GameStore()
      expect(game.timer).not.toBeDefined()
      expect(game.status).toBe('playing')
      expect(game.cells.length).toBe(64)
      expect(game.remainingFlags).toBe(10)
    })
  })

  it('should start the timer if 1st cell clicked is not a mine', () => {
    const game = new GameStore()
    const nonMineCell = game.cells.find(cell => !cell.isMine)
    nonMineCell.reveal()
    expect(game.timer).toBeDefined()
  })

  it('should start the timer if 1st cell flagged is not a mine', () => {
    const game = new GameStore()
    const nonMineCell = game.cells.find(cell => !cell.isMine)
    nonMineCell.isFlagged = true
    expect(game.timer).toBeDefined()
  })

  it('should end game if a mine is clicked', () => {
    const game = new GameStore()
    const mine = game.cells.find(cell => cell.isMine)
    mine.reveal()
    expect(game.status).toBe('lost')
  })

  it('should display all mines', () => {
    const game = new GameStore()
    game.displayMines()
    const mines = game.cells.filter(cell => cell.isMine)
    const allMinesVisible = mines.every(mine => mine.isVisible)
    expect(allMinesVisible).toBe(true)
  })

  it('should generate the proper amount of mines', () => {
    const game = new GameStore()
    const minePositions = game.generateMinePositions()
    const numOfMinePositions = Object.keys(minePositions).length
    expect(numOfMinePositions).toEqual(game.mineCount)
  })

  it('should increment mines', () => {
    const game = new GameStore()
    const originalMinesCount = game.mineCount
    const originalMines = game.cells.filter(cell => cell.isMine)
    game.incrementMines()
    expect(game.mineCount).toBeGreaterThan(originalMinesCount)
    const currentMines = game.cells.filter(cell => cell.isMine)
    expect(currentMines.length).toBeGreaterThan(originalMines.length)
  })

  it('should decrement mines', () => {
    const game = new GameStore()
    const originalMinesCount = game.mineCount
    const originalMines = game.cells.filter(cell => cell.isMine)
    game.decrementMines()
    expect(game.mineCount).toBeLessThan(originalMinesCount)
    const currentMines = game.cells.filter(cell => cell.isMine)
    expect(currentMines.length).toBeLessThan(originalMines.length)
  })

  it('should increment rows', () => {
    const game = new GameStore()
    const originalRowsCount = game.rowCount
    game.incrementRows()
    expect(game.rowCount).toBeGreaterThan(originalRowsCount)
  })

  it('should decrement rows', () => {
    const game = new GameStore()
    const originalRowsCount = game.rowCount
    game.decrementRows()
    expect(game.rowCount).toBeLessThan(originalRowsCount)
  })
})