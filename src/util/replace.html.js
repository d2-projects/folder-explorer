import dayjs from 'dayjs'
import { placeholdersUtilDay } from './replace.util.day'

export function placeholders ({ now, path, remote } = {}) {
  return [
    { name: 'path', description: '扫描目录', function: () => path },
    { name: 'remote', description: '远程地址', function: () => remote },
    ...placeholdersUtilDay({ now })
  ]
}

export function replace (userString, { path, remote }) {
  let result = userString
  placeholders({ now: dayjs(), path, remote }).forEach(placeholder => {
    result = result.replace(RegExp('{' + placeholder.name + '}', 'g'), placeholder.function())
  })
  return result
}
