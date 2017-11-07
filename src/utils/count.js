

export const count = (ls, cb) => ls.reduce((count, item) => cb(item) ? ++count : count, 0)