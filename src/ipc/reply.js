import { ipcRenderer } from 'electron'
import store from '../store'

export default function () {
  // 接收文件夹选择的结果
  ipcRenderer.on(
    'IPC_DIR_SELECT_REPLY',
    (event, arg) => {
      store.commit('SCAN_FOLDER_PATH_UPDATE', arg)
      store.commit('IPC_DIR_SCAN')
    }
  )
  // 接收返回的扫描结果
  ipcRenderer.on(
    'IPC_DIR_SCAN_REPLY',
    (event, arg) => store.commit('SCAN_RESULT_UPDATE', arg)
  )
}
