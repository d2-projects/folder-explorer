/**
 * 将扫描结果转换成展示需要的数据
 * @param {Object} param0 {Object} data 扫描结果
 * @param {Object} param0 {Array} notes 备注数据库
 */
export default function ({
  data,
  notes
}) {
  function treeRowMaker ({ isFirst, isLast, parentTree }) {
    let body = ''
    let end = '├─'
    // 判断 end
    if (isFirst) end = '├─'
    if (isLast) end = '└─'
    // 判断 body
    body = parentTree.map(cell => {
      if (cell === '│ ' || cell === '  ') {
        return cell
      } else if (cell === '├─') {
        return '│ '
      }else {
        return '  '
      }
    })
    return [...body, end]
  }
  function maker ({
    dataArray,
    level,
    parentTree = [],
    parentDataPath = ''
  }) {
    dataArray
      .forEach((item, index) => {
        // 文字前面的树枝
        const treeBody = treeRowMaker({
          isFirst: index === 0,
          isLast: index === dataArray.length - 1,
          parentTree
        })
        // 添加一行
        result.push({
          id: item.filePathFull,
          tree: treeBody.join(''),
          note: notes[item.filePathFull] || '',
          dataPath: `${parentDataPath}[${item.index}]`, // like "[13].elements[5].elements[2]"
          ...item
        })
        // 如果是文件夹的话，遍历文件夹内容
        if (item.isDirectory) {
          maker({
            dataArray: item.elements,
            level: level + 1,
            parentTree: treeBody,
            parentDataPath: `${parentDataPath}[${item.index}].elements`
          })
        }
      })
  }
  let result = []
  maker({
    dataArray: data,
    level: 1
  })
  return result
}
