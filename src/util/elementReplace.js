export function elementPlaceholders ({ data } = {}) {
  return [
    {
      name: 'tree',
      description: '树形结构',
      function () {
        return data.tree.text
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

export function elementReplace(userString, { data }) {
  let result = userString
  elementPlaceholders({ data }).forEach(placeholder => {
    result = result.replace(RegExp('{' + placeholder.name + '}', 'g'), placeholder.function())
  })
  return result
}
