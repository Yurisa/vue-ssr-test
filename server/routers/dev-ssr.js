const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFs = require('memory-fs')
const webpack = require('webpack')
const resolve = file => path.resolve(__dirname, file)
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.server.config')

const msf = new MemoryFs()
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = msf

let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(err))

  bundle = msf.readFileSync(path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'), 'utf-8')
  console.log(bundle)
  console.log('new bundle generated')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = 'please wait...'
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
  )

  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(resolve('../../src/index.template.ejs'), 'utf-8')

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })

  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
