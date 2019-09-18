import dayjs from 'dayjs'
import { placeholdersUtilDay } from './replace.util.day'

export function placeholders ({ now, path } = {}) {
  return [
    {
      name: 'path',
      description: '扫描目录',
      function () {
        return path
      }
    },
    ...placeholdersUtilDay({ now })
  ]
}

export function replace (userString, { path }) {
  let result = userString
  placeholders({ now: dayjs(), path }).forEach(placeholder => {
    result = result.replace(RegExp('{' + placeholder.name + '}', 'g'), placeholder.function())
  })
  return result
}
