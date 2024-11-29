// Use Dep
import {
  concurrently,
  Chalk,
  ora,
  fse,
  resolve,
  join,
  readFileSync,
  writeFileSync,
  execa,
  inquirer,
  Command,
  spawn,
  Koa,
  Bodyparser,
  Router,
  Static,
  download,
} from './dep.js'

// Create Prompt
const prompt = inquirer.createPromptModule()

// Create Program
export const program = new Command()

// Cwd As Root
export const root = process.cwd()

// Default Level 2: 256 Colors
export const chalk = new Chalk({ level: 2 })

/**
 * Joint for Command Concurrently
 * @param {Array} commands  { command,name }
 * @returns
 */
export const joint = (commands = [], options = {}) =>
  concurrently(
    commands,
    Object.assign(
      {
        prefix: 'name',
        killOthers: ['failure', 'success'],
        restartTries: 3,
        cwd: root,
        prefixColors: ['blue'],
      },
      options
    )
  )

// Console
export const $console = {
  // Log
  log: (info) => console.log(chalk.cyan(info)),
  // Error
  error: (info) => console.log(chalk.red(info)),
}

// Progress by Ora
export const progress = async (handler = () => {}, status = {}) => {
  // Default Status
  status = Object.assign(
    { start: `Start!`, success: `Success!`, error: `Error!` },
    status
  )

  // Spinner Start
  const spinner = ora(status.start).start()

  // Await Handler
  try {
    await handler(spinner)
  } catch (e) {
    spinner.fail(`${status.error}: ${e}`)
  }

  // Success
  spinner.succeed(status.success)

  // Destroy
  spinner.stop()
}

// Read File
export const read = (path, fmt = 'utf-8') => {
  try {
    return readFileSync(resolve(root, path), fmt)
  } catch (error) {
    return '{}'
  }
}

// Write File
export const write = (path, file, fmt = 'utf-8') => {
  try {
    writeFileSync(resolve(root, path), file, fmt)
  } catch (error) {}
}

// PackageJson
export const pkg = JSON.parse(read('package.json'))

// Fse
export const { move } = fse

// Exe
export const exe = async (cmd, args = [], opts = {}) => {
  try {
    const { stdout, stderr } = await execa(cmd, args, opts)

    return stdout
  } catch ({ message }) {
    throw new Error(message)
  }
}

/**
 *  Readline
 * @param {Array} question { type,name,message,default,validate}
 * @returns
 */
export const rl = (question = []) => prompt(question).then((res) => res)

// Spawn
export const spn = (cmd, args, cb = () => {}) => {
  const child = spawn(cmd, args)

  const { pid, killed } = child

  child.stdout.on('data', (data) => {
    $console.log(`>>>> [${pid}] stdout: ${data}`)
    cb(data)
  })

  child.stderr.on('data', (data) => {
    $console.error(`>>>> [${pid}] stderr: ${data}`)
  })

  child.on('close', (code) => {
    $console.log(`>>>> [${pid}] 子进程退出，退出码 ${code}`)
  })
}

// Service By Koa
export const service = ({ port = 3000, staticdir, routes = [] }) => {
  // New Instance
  const app = new Koa()

  // New Router
  const router = new Router()

  // Use BodyParser  Before router
  app.use(Bodyparser())

  // Loop routes
  routes.map(({ path, method, callback }) => {
    router[method](path, async (ctx) => {
      callback(ctx)
    })
  })

  app.use(router.routes()).use(router.allowedMethods())

  // Static Service
  if (staticdir) app.use(Static(join(root, staticdir)))

  // Launch
  app.listen(port, () => {
    $console.log(`Koa server is running at http://localhost:${port}`)
  })
}

/**
 * GitClone
 * @param {String} repoUrl     仓库地址
 * @param {String} destination  目标文件存放位置
 * @param {Object} options  配置
 */
export const gitclone = (repoUrl, destination, options = {}) => {
  // Combine Options
  options = Object.assign({ clone: false }, options)

  download(repoUrl, destination, options, function (err) {
    if (err) {
      $console.error('下载失败:', err)
    } else {
      $console.log('下载成功')
    }
  })
}
