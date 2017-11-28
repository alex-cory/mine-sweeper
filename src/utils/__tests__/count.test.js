import { count } from '..'


describe('Count test', () => {
  it('should count all numbers less than 4', () => {
    const nums = [1, 1, 1, 2, 2, 3, 3, 4, 5, 6, 6, 7]
    const countNumsLessThan4 = count(nums, num => num < 4)
    expect(countNumsLessThan4).toBe(7)
  })
})