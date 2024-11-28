import { basename, delimiter, dirname, extname, isAbsolute, join } from 'path'

/**
 *  basename(path[, suffix]) 返回path的最后一部分
 *  @param <string>  path  路径
 *  @param <string>  suffix  要删除的内容
 *  @returns <string>
 */

basename('/foo/bar/baz/asdf/quux.html')
// Return: 'quux.html'

basename('/foo/bar/baz/asdf/quux.html', 'html')
// Return: 'quux.'

// ===========================================

/**
 *  delimiter 提供不同平台的路径定界符
 *  @returns <string>
 *     ':' -- mac
 *     ';' -- windows
 */
delimiter
// Return: ':'

// ===========================================

/**
 *  dirname(path)   返回 path 的目录名
 *  @param <string>  path  路径
 *  @returns <string>
 */

dirname('/foo/bar/baz/asdf/quux')
// Return: '/foo/bar/baz/asdf'

// ===========================================

/**
 *   extname(path) 返回path的扩展名
 *   @param <string> path  路径
 *   @returns <string>
 */
extname('/foo/bar/baz/asdf/quux.js')
// Return: '.js'

extname('/foo/bar/baz/asdf/quux.module.css')
// Return: '.css'

// ===========================================

/**
 *  isAbsolute(path) 检测是否是绝对路径
 *  @param <string>  path  路径
 *  @returns <string>
 */
isAbsolute('/foo/bar') // true
isAbsolute('qux/') // false
isAbsolute('.') // false

// ===========================================

/**
 *  join([...paths]) 路径拼接，使用不同平台的分隔符，将路径拼接起来
 *  @param <array>  paths  路径数组
 *  @returns <string>
 *     '/' -- mac
 *     '\' -- windows
 */
join('foo', 'bar', 'baz', 'quux')
// Return '/foo/bar/baz/quux    -- mac
// Return '\foo\bar\baz\quux    --  windows

console.log(11, process.memoryUsage())
