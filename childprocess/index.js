import { exec, spawn, fork } from 'child_process'

// Exec
// exec('ls -al', (error, stdout, stderr) => {
//   if (error) {
//     console.error('错误', error.message)
//     return
//   }
//   console.log('标准输出', stdout)
//   console.error(`标准错误输出: ${stderr}`)
// })

// Spawn
// 启动一个 Node.js 子进程执行 `spawn.js`
// const child = spawn('node', ['spawn.js'])

// // 处理子进程的标准输出
// child.stdout.on('data', (data) => {
//   console.log(`子进程输出: ${data}`)
// })

// // 处理子进程的标准错误输出
// child.stderr.on('data', (data) => {
//   console.error(`子进程错误输出: ${data}`)
// })

// // 监听子进程的关闭事件
// child.on('close', (code, signal) => {
//   console.log(`子进程已关闭，退出码: ${code}, 信号: ${signal}`)
// })

// // 向子进程的标准输入写入数据
// child.stdin.write('Hello !\n')
// child.stdin.end() // 结束标准输入流

// Fork
const child = fork('./fork.js')

child.on('message', (message) => {
  console.log('来自子进程的消息:', message)
})

child.send({ hello: 'world' })
