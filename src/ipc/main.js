import { ipcMain, dialog } from 'electron'
import scan from '../util/scan'

/**
 * 渲染进程请求选择文件
 */
ipcMain.on('IPC_DIR_SELECT', (event, arg) => {
  const path = dialog.showOpenDialogSync({
    title: '选择目录',
    buttonLabel: '选择该目录',
    properties: [
      'openDirectory',
      'createDirectory'
    ],
    message: '请选择一个文件夹'
  })
  event.returnValue = path[0] || ''
})

/**
 * 渲染进程请求扫描文件夹
 */
ipcMain.on('IPC_DIR_SCAN', async (event, { filePath }) => {
  event.reply('IPC_DIR_SCAN_REPLY', await scan(filePath))
})
