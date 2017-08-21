export const log = (...args) => __DEBUG__ ? console.log(...args) : undefined

export const logError = (...args) => __DEBUG__ ? console.error(...args) : undefined

export const renderIf = (conditional, output) =>
  conditional
    ? output
    : undefined
