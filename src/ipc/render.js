import { ipcRenderer } from 'electron'

/**
 * @description 选择目录
 */
export function IPC_RENDER_DIR_SELECT () {
  return ipcRenderer.sendSync('IPC_RENDER_DIR_SELECT')
}
