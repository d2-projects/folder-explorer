import { ipcRenderer } from 'electron'
import { notification } from 'ant-design-vue'

// type 通知类型
// - close: ƒ close(key)
// - config: ƒ setNotificationConfig(options)
// - destroy: ƒ destroy()
// - error: ƒ (args)
// - info: ƒ (args)
// - open: ƒ notice(args)
// - success: ƒ (args)
// - warn: ƒ (args)
// - warning: ƒ (args)

/**
 * 发送通知
 * 如果本地通知不可用，降级使用前端组件库的通知
 * @param {Object} param0 {String} type 通知类型 error | info | success | warning | open
 * @param {Object} param0 {String} title 标题
 * @param {Object} param0 {String} body 通知内容
 */
export const notify = function ({
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

export default {
  install: function (Vue, options) {
    Vue.prototype.$notify = notify
  }
}
