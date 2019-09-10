export function notePlaceholders ({ data } = {}) {
  return [
    {
      name: 'note',
      description: '备注内容',
      function () {
        return data.note
      }
    }
  ]
}

export function noteReplace(userString, { data }) {
  let result = userString
  notePlaceholders({ data }).forEach(placeholder => {
    result = result.replace(RegExp('{' + placeholder.name + '}', 'g'), placeholder.function())
  })
  return result
}
