#!/usr/bin/env node

// Use Kit
import { pkg, rl, program } from '../utils/kit.js'

// Set Version
program.version(`v${pkg.version}`)

program
  .command('start')
  .description('开启部署监听服务')
  .option('-p, --port <port>', '指定部署服务监听端口')
  .option('-w, --password <key>', '设置登录密码')
  .action(async (options) => {
    let { port, password } = options
    const args =
      // 指令行中是否带参数
      port && password
        ? { port, password }
        : await rl([
            {
              type: 'number',
              name: 'port',
              default: 7777,
              message: '请指定部署服务监听端口：',
              validate: (value) =>
                value !== '' && (value < 3000 || value > 10000)
                  ? `端口号必须在 3000 - 10000 之间`
                  : true,
            },
            {
              type: 'password',
              name: 'password',
              message: '请设置登录密码',
              mask: true,
              validate: (value) =>
                value.length < 6 ? `密码需要 6 位以上` : true,
            },
          ])

    console.log('args', args)
  })

program.parse()
