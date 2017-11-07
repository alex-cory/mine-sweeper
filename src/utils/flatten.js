
/**
 * This flatten will only shallow flatten an array and
 * will only work on a full multidimensional array.
 * Yes:
 * [[1], [1,2]]
 * No:
 * [1, [2]]
 * [[1, [2]]]
 */
export const flatten = mArr => mArr.reduce((acc, arr) => {
  acc.push(...arr)
  return acc
}, [])
