import dayjs from 'dayjs'

export const placeholders = [
  {
    name: 'time',
    description: '时间戳',
    function () {
      return dayjs().unix()
    }
  },
  {
    name: 'year',
    description: '年',
    function () {
      return dayjs().format('YYYY')
    }
  },
  {
    name: 'month',
    description: '月',
    function () {
      return dayjs().format('MM')
    }
  },
  {
    name: 'day',
    description: '日',
    function () {
      return dayjs().format('DD')
    }
  }
]

export function stringReplace(userString) {
  let result = userString
  placeholders.forEach(placeholder => {
    result = result.replace(RegExp('{' + placeholder.name + '}'), placeholder.function())
  })
  return result
}
