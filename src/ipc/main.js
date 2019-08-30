import { ipcMain, dialog, BrowserWindow, Notification } from 'electron'
import scan from '../util/scan'

/**
 * 渲染进程请求选择文件
 */
ipcMain.on('IPC_DIR_SELECT', async (event, arg) => {
  const window = BrowserWindow.getFocusedWindow()
  const result = await dialog.showOpenDialog(window, {
    title: '选择目录',
    buttonLabel: '选择该目录',
    properties: [
      'openDirectory',
      'createDirectory'
    ],
    message: '请选择一个文件夹'
  })
  if (result.canceled === false) {
    event.reply('IPC_DIR_SELECT_REPLY', result.filePaths[0])
  }
})

/**
 * 渲染进程请求扫描文件夹
 */
ipcMain.on('IPC_DIR_SCAN', async (event, { folderPath }) => {
  event.reply('IPC_DIR_SCAN_REPLY', await scan({ folderPath }))
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
