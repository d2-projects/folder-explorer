export function placeholders ({ data } = {}) {
  return [
    { name: 'name', description: '文件名', function () { return data.name } },
    { name: 'note', description: '备注内容', function () { return data.note } },
    { name: 'ext', description: '文件类型', function () { return data.ext } }
  ]
}

export function replace(userString, { data }) {
  let result = userString
  placeholders({ data }).forEach(placeholder => {
    result = result.replace(RegExp('{' + placeholder.name + '}', 'g'), placeholder.function())
  })
  return result
}
