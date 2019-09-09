import dayjs from 'dayjs'

export const placeholders = [
  {
    name: 'time',
    description: '时间戳',
    function () {
      return dayjs().unix()
    }
  },
  { name: 'YY', description: '两位数的年份', function () { return dayjs().format('YY') } },
  { name: 'YYYY', description: '四位数的年份', function () { return dayjs().format('YYYY') } },
  { name: 'M', description: '月份，从 1 开始', function () { return dayjs().format('M') } },
  { name: 'MM', description: '月份，两位数', function () { return dayjs().format('MM') } },
  { name: 'MMM', description: '简写的月份名称', function () { return dayjs().format('MMM') } },
  { name: 'MMMM', description: '完整的月份名称', function () { return dayjs().format('MMMM') } },
  { name: 'D', description: '月份里的一天', function () { return dayjs().format('D') } },
  { name: 'DD', description: '月份里的一天，两位数', function () { return dayjs().format('DD') } },
  { name: 'd', description: '一周中的一天，星期天是 0', function () { return dayjs().format('d') } },
  { name: 'dd', description: '最简写的一周中一天的名称', function () { return dayjs().format('dd') } },
  { name: 'ddd', description: '简写的一周中一天的名称', function () { return dayjs().format('ddd') } },
  { name: 'dddd', description: '一周中一天的名称', function () { return dayjs().format('dddd') } },
  { name: 'H', description: '小时', function () { return dayjs().format('H') } },
  { name: 'HH', description: '小时，两位数', function () { return dayjs().format('HH') } },
  { name: 'h', description: '小时, 12 小时制', function () { return dayjs().format('h') } },
  { name: 'hh', description: '小时, 12 小时制, 两位数', function () { return dayjs().format('hh') } },
  { name: 'm', description: '分钟', function () { return dayjs().format('m') } },
  { name: 'mm', description: '分钟，两位数', function () { return dayjs().format('mm') } },
  { name: 's', description: '秒', function () { return dayjs().format('s') } },
  { name: 'ss', description: '秒 两位数', function () { return dayjs().format('ss') } },
  { name: 'SSS', description: '毫秒 三位数', function () { return dayjs().format('SSS') } },
  { name: 'Z', description: 'UTC 的偏移量', function () { return dayjs().format('Z') } },
  { name: 'ZZ', description: 'UTC 的偏移量，数字前面加上 0', function () { return dayjs().format('ZZ') } },
  { name: 'A',	description: 'AM PM', function () { return dayjs().format('A') } },
  { name: 'a',	description: 'am pm', function () { return dayjs().format('a') } }
]

export function stringReplace(userString) {
  let result = userString
  placeholders.forEach(placeholder => {
    result = result.replace(RegExp('{' + placeholder.name + '}', 'g'), placeholder.function())
  })
  console.log(result)
  return result
}
