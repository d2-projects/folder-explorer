import fs from 'fs'
import path from 'path'
import { ipcMain, dialog, BrowserWindow, Notification, shell } from 'electron'
import scan from '../util/scan'

async function saveFile ({ filePath, fileName, value }) {
  const writeData = new Uint8Array(Buffer.from(value))
  const filePathName = path.join(filePath, fileName)
  await fs.writeFileSync(filePathName, writeData)
}

/**
 * 渲染进程请求选择扫描的文件夹
 */
ipcMain.on('IPC_DIR_SELECT', async (event, arg) => {
  const window = BrowserWindow.getFocusedWindow()
  const result = await dialog.showOpenDialog(window, {
    title: '选择目录',
    buttonLabel: '确定',
    properties: [
      'openDirectory',
      'createDirectory'
    ],
    message: '请选择一个需要扫描的文件夹'
  })
  if (result.canceled === false) {
    event.reply('IPC_DIR_SELECT_REPLY', result.filePaths[0])
  }
})

/**
 * 渲染进程请求选择保存结果的目录
 */
ipcMain.on('IPC_EXPORT', async (event, { name, value }) => {
  const window = BrowserWindow.getFocusedWindow()
  const result = await dialog.showOpenDialog(window, {
    title: '选择目录',
    buttonLabel: '确定',
    properties: [
      'openDirectory',
      'createDirectory'
    ],
    message: '需要将导出的文件放置在哪个位置'
  })
  if (result.canceled === false) {
    await saveFile({
      filePath: result.filePaths[0],
      fileName: name,
      value
    })
    event.reply('IPC_EXPORT_REPLY')
  }
})

/**
 * 渲染进程请求扫描文件夹
 */
ipcMain.on('IPC_DIR_SCAN', async (event, { folderPath }) => {
  event.reply('IPC_DIR_SCAN_REPLY', await scan({
    folderPath,
    needCheckIsFolder: true
  }))
})

/**
 * 渲染进程请求发送桌面通知
 */
ipcMain.on('IPC_SEND_NOTIFICATION', async (event, {
  title = 'Folder Explorer',
  body = ''
}) => {
  event.returnValue = Notification.isSupported()
  if (Notification.isSupported()) {
    const notification = new Notification({
      title,
      body
    })
    notification.show()
  }
})

/**
 * 渲染进程请求发送桌面通知
 */
ipcMain.on('IPC_SHOW_ITEM_IN_FOLDER', async (event, {
  itemPath
}) => {
  shell.showItemInFolder(itemPath)
})
