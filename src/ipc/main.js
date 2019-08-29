const { ipcMain, dialog } = require('electron')

/**
 * 渲染进程请求选择文件
 */
ipcMain.on('IPC_RENDER_DIR_SELECT', (event, arg) => {
  console.log('ipcMain on IPC_RENDER_DIR_SELECT')
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
