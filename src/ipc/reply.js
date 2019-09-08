import { ipcRenderer } from 'electron'
import store from '../store'

export default function (instance) {
  // 接收文件夹选择的结果
  ipcRenderer.on(
    'IPC_FOLDER_SELECT_REPLY',
    (event, arg) => {
      store.commit('SCAN_FOLDER_PATH_UPDATE', arg)
      store.commit('IPC_FOLDER_SCAN')
    }
  )
  // 接收返回的扫描结果
  ipcRenderer.on(
    'IPC_FOLDER_SCAN_REPLY',
    (event, arg) => {
      store.commit('SCAN_RESULT_UPDATE', arg)
    }
  )
  // 接收导出文件的返回结果
  ipcRenderer.on(
    'IPC_EXPORT_REPLY',
    (event, arg) => {
      instance.$message.success('内容已经导出')
    }
  )
}
