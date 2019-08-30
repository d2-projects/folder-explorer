import { ipcRenderer } from 'electron'
import { notification } from 'ant-design-vue'

// notification
// - close: ƒ close(key)
// - config: ƒ setNotificationConfig(options)
// - destroy: ƒ destroy()
// - error: ƒ (args)
// - info: ƒ (args)
// - open: ƒ notice(args)
// - success: ƒ (args)
// - warn: ƒ (args)
// - warning: ƒ (args)

export default {
  install: function (Vue, options) {
    Vue.prototype.$notify = function ({
      type = 'open',
      title = '',
      body = ''
    }) {
      // https://electronjs.org/docs/api/notification
      const canElectronSend = ipcRenderer.sendSync('IPC_SEND_NOTIFICATION', {
        title,
        body
      })
      if (!canElectronSend) {
        notification[type]({
          message: title,
          description: body
        })
      }
    }
  }
}
