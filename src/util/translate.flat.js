/**
 * 将扫描结果转换成展示需要的数据
 * @param {Object} param0 {Object} data 扫描结果
 */
export default function (data) {
  function treeRowMaker ({ level, isFirst, isLast, parentTree }) {
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
  function maker (dataArray, level, parentTree = []) {
    dataArray.forEach((item, index) => {
      // 文字前面的树枝
      const treeBody = treeRowMaker({
        level,
        isFirst: index === 0,
        isLast: index === dataArray.length - 1,
        parentTree
      })
      // 添加一行
      result.push({
        id: item.filePathFull,
        tree: {
          text: treeBody.join('')
        },
        note: '',
        data: item
      })
      // 如果是文件夹的话，遍历文件夹内容
      if (item.isDirectory) {
        maker(item.children, level + 1, treeBody)
      }
    })
  }
  let result = []
  maker(data, 1)
  return result
}
