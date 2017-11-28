import { flatten } from '..'


describe('Flatten test', () => {
  it('should flatten a multi-dimensional array only containing arrays', () => {
    const multi = [[1, 2, 3], [4, 5, 6]]
    const arr = flatten(multi)
    expect(arr).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6]))
  })
})