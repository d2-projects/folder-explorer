export function placeholdersUtilDay ({ now } = {}) {
  return [
    {
      name: 'time',
      description: '时间戳',
      function () {
        return now.unix()
      }
    },
    { name: 'YY', description: '两位数的年份', function () { return now.format('YY') } },
    { name: 'YYYY', description: '四位数的年份', function () { return now.format('YYYY') } },
    { name: 'M', description: '月份，从 1 开始', function () { return now.format('M') } },
    { name: 'MM', description: '月份，两位数', function () { return now.format('MM') } },
    { name: 'MMM', description: '简写的月份名称', function () { return now.format('MMM') } },
    { name: 'MMMM', description: '完整的月份名称', function () { return now.format('MMMM') } },
    { name: 'D', description: '月份里的一天', function () { return now.format('D') } },
    { name: 'DD', description: '月份里的一天，两位数', function () { return now.format('DD') } },
    { name: 'd', description: '一周中的一天，星期天是 0', function () { return now.format('d') } },
    { name: 'dd', description: '最简写的一周中一天的名称', function () { return now.format('dd') } },
    { name: 'ddd', description: '简写的一周中一天的名称', function () { return now.format('ddd') } },
    { name: 'dddd', description: '一周中一天的名称', function () { return now.format('dddd') } },
    { name: 'H', description: '小时', function () { return now.format('H') } },
    { name: 'HH', description: '小时，两位数', function () { return now.format('HH') } },
    { name: 'h', description: '小时, 12 小时制', function () { return now.format('h') } },
    { name: 'hh', description: '小时, 12 小时制, 两位数', function () { return now.format('hh') } },
    { name: 'm', description: '分钟', function () { return now.format('m') } },
    { name: 'mm', description: '分钟，两位数', function () { return now.format('mm') } },
    { name: 's', description: '秒', function () { return now.format('s') } },
    { name: 'ss', description: '秒 两位数', function () { return now.format('ss') } },
    { name: 'SSS', description: '毫秒 三位数', function () { return now.format('SSS') } },
    { name: 'Z', description: 'UTC 的偏移量', function () { return now.format('Z') } },
    { name: 'ZZ', description: 'UTC 的偏移量，数字前面加上 0', function () { return now.format('ZZ') } },
    { name: 'A',	description: 'AM PM', function () { return now.format('A') } },
    { name: 'a',	description: 'am pm', function () { return now.format('a') } }
  ]
}
