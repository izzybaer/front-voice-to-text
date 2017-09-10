export const log = (...args) => __DEBUG__ ? console.log(...args) : undefined

export const logError = (...args) => __DEBUG__ ? console.error(...args) : undefined

export const renderIf = (conditional, output) =>
  conditional
    ? output
    : undefined

export const cookieTime = days => {
  let result = new Date()
  let millisecondsPerDay = 86400000
  result.setTime(result.getTime() + (days * millisecondsPerDay))
  return result.toUTCString()
}

export const cookieCreate = (name, value, days) => {
  let expires = days ? ` ${cookieTime(days)};` : ''
  document.cookie = `${name}=${value};${expires} path='/'`
}

export const cookieFetch = key => {
  let allCookies = Object.assign({}, ...document.cookie.split(';')
    .map(cookie => {
      let [key, value] = cookie.split('=')
      log(key.trim())
      return {[key.trim()]: value}
    }))
  log(allCookies)
  return allCookies[key]
}

export const cookieDelete = key => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
}
