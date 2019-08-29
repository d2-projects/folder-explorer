import { ipcRenderer } from 'electron'

/**
 * @description 选择目录
 */
export function IPC_DIR_SELECT () {
  return ipcRenderer.sendSync('IPC_DIR_SELECT')
}

/**
 * 请求扫描目录
 * @param {String} filePath 文件目录
 */
export function IPC_DIR_SCAN ({ filePath }) {
  return ipcRenderer.send('IPC_DIR_SCAN', { filePath })
}
