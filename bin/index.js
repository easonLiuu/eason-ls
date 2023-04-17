#!/usr/bin/env node
const fs = require('fs')
const parse = require('./parseArgs')
const auth = require('./auth')
const getFileType = require('./getFileType')

const dir = process.cwd()

const { isAll, isList, args } = parse()
let files = fs.readdirSync(dir)
let output = ''
if (!isAll) {
    files = files.filter(file => file.indexOf('.') !== 0)
}
if (!isList) {
    // 遍历当前文件夹下的所有文件, 并排除以.开头的文件或者文件夹
    files.forEach(file => output += file + '            ')
} else {
    // bin: rwx r-x r-x
    // package.json: rw- r-- r--   
    // r: 访问 w: 编辑 x: 执行
    // u: 当前登录用户 g: 当前登录用户所在分组 o: 其他用户
    // bin: 16877 -> 0100 0001 1110 1101
    // S_IFDIR: 16384 -> 0100 0000 0000 0000
    files.forEach((file, index) => {
        // 获取文件详细信息
        const stat = fs.statSync(file)
        // 获取文件的mode码
        const mode = stat.mode
        const fileType = getFileType(mode)
        const authString = auth(mode)
        // 通过"与"判断当前文件是不是目录
        // const isDir = mode & fs.constants.S_IFDIR
        // 通过"与"判断当前文件是不是文件
        // const isFile = mode & fs.constants.S_IFREG
        // console.log(mode, stat.isDirectory(), isFile > 0, fs.constants.S_IFDIR)
        if (index === files.length - 1) {
            output += fileType + authString + '\t' + file
        } else {
            output += fileType + authString + '\t' + file + '\n'
        }
    })
}
console.log(output)

// console.log(process.argv, args, isAll, isList)