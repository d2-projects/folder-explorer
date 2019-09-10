export function placeholders ({ data } = {}) {
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

export function replace(userString, { data }) {
  let result = userString
  placeholders({ data }).forEach(placeholder => {
    result = result.replace(RegExp('{' + placeholder.name + '}', 'g'), placeholder.function())
  })
  return result
}
