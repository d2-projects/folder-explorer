import fs from 'fs'
import path from 'path'
import contains from 'contains-path'
import { BrowserWindow, dialog } from 'electron'

/**
 * 返回传入目录的子文件数据
 * @param {Object} param0 {String} folderPath 文件夹路径
 * @param {Object} param0 {Boolean} needCheckIsFolder 判断传入的是否为文件夹
 */
async function scan ({
	folderPath,
	ignorePath,
	needCheckIsFolder = false,
	rootFolderPath = folderPath
}) {
	let result = []
	// 检查该路径是否忽略
	function isIgnore (value) {
		let result = false
		for (const ignoreText of ignorePath) {
			if (contains(value, ignoreText)) {
				result = true
			}
		}
		return result
	}
	// 防止拖拽导入的路径不是文件夹，这个判断只在递归的第一次触发
	if (needCheckIsFolder && !await fs.statSync(folderPath).isDirectory()) {
		dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
			type: 'error',
			message: '检测到非文件夹输入',
			detail: '请选择文件夹或者将文件夹拖入程序窗口'
		})
		return result
	}
	// 获得文件夹的内容
	const files = await fs.readdirSync(folderPath)
	for (const filename of files) {
		// path
		const filePathFull = path.join(folderPath, filename)
		const filePath = filePathFull.replace(rootFolderPath, '')
		// 判断是否根据路径忽略
		if (isIgnore(filePath)) continue
		// stat
		const stat = await fs.statSync(filePathFull)
		const isFile = stat.isFile()
		const isDirectory = stat.isDirectory()
		result.push({
			// stat
			stat: {
				...stat,
				isFile,
				isDirectory
			},
			// path
			filePath,
			filePathParsed: path.parse(filePath),
			filePathFull,
			filePathFullParsed: path.parse(filePathFull),
			// 如果是文件夹，其子文件或者子文件夹
			children: isDirectory ? await scan({
				folderPath: filePathFull,
				ignorePath,
				rootFolderPath
			}) : []
		})
	}
	return result
}

function saveFile (fileName = '', text = '') {
	const writeData = new Uint8Array(Buffer.from(text))
	fs.writeFile(`./${fileName}`, writeData, (err) => {
		if (err) throw err
		console.log('文件已被保存')
	})
}

// ;(async function () {
// 	saveFile('数据.txt', JSON.stringify(await scan(path.resolve('/Users/liyang/Documents/code/blog')), null, 2))
// })()

export default scan
