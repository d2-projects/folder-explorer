export function placeholders ({ data } = {}) {
  return [
    {
      name: 'tree',
      description: '树形结构',
      function () {
        return data.tree
      }
    },
    {
      name: 'name',
      description: '文件名',
      function () {
        return data.data.name
      }
    },
    {
      name: 'ext',
      description: '扩展名',
      function () {
        return data.data.ext
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
