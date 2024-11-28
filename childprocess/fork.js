process.on('message', (message) => {
  console.log('来自父进程的消息:', message)
})

process.send({ foo: 'bar' })
