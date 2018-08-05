import createApp from './create-app'

export default context => {
  // 因为这边 router.onReady 是异步的，所以我们返回一个 Promise
  // 确保路由或组件准备就绪
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    if (context.name) {
      store.state.name = context.name
    }

    router.push(context.url)
    router.onReady(() => {
      resolve(app)
    }, reject)
  })
}
