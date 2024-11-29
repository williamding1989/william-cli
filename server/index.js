// Use Kit
import { read, service } from '../utils/kit.js'

// Get Port
const { port } = JSON.parse(read('server/config.js'))

// Run Service
service({
  port,
  staticdir: 'public',
  routes: [
    {
      path: '/',
      method: 'get',
      callback: (ctx) => {
        ctx.body = { code: '200', message: '成功数据' }
      },
    },
  ],
})
