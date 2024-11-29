#!/usr/bin/env node

// Use Kit
import { pkg, rl, program, joint, write, gitclone } from '../utils/kit.js'

// Set Version
program.version(`v${pkg.version}`)

// Init CLi
program
  .command('start')
  .description('开启部署监听服务')
  .option('-p, --port <port>', '指定部署服务监听端口')
  .action(async (options) => {
    let { port } = options
    const args =
      // 指令行中是否带参数
      port
        ? { port }
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
          ])

    // Write Config
    write('server/config.js', JSON.stringify(args))

    // Joint PM2
    joint([
      {
        command:
          'pm2 restart koa-service|| pm2 start server/index.js -n "koa-service"',
      },
    ])
  })

program.parse()
