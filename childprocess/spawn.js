// 从标准输入读取数据
process.stdin.on('data', (data) => {
  console.log(`子进程接收到输入: ${data.toString().trim()}`)
})

// 当输入流结束时触发
process.stdin.on('end', () => {
  console.log('子进程的标准输入已结束')
})
