/**
 * 将扫描结果转换成文本
 * @param {Object} param0 {Object} data 扫描结果
 * @param {Object} param0 {Object} setting 设置
 */
export function translateToText ({
  data
}) {
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
    dataArray.forEach((fileOrDir, index) => {
      // 文字前面的树枝
      const treeBody = treeRowMaker({
        level,
        isFirst: index === 0,
        isLast: index === dataArray.length - 1,
        parentTree
      })
      // 添加一行
      result.push(treeBody.join('') + fileOrDir.nameFull)
      // 如果是文件夹的话，遍历文件夹内容
      if (fileOrDir.isDirectory) {
        maker(fileOrDir.children, level + 1, treeBody)
      }
    })
  }
  let result = []
  maker(data, 1)
  return result.join('\n')
}