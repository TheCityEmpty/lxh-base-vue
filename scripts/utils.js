const fs = require('fs')
const path = require('path')


/**
 * 
 * @param {Stirng} url 
 * @returns position url
 */
const resolve = (url) => {
    return path.resolve(__dirname, url)
}
/**
 * 判断文件是否存在
 * @param {String} url 
 * @returns file is exit
 */
const fsIsExit = (url) => {
    return fs.existsSync(resolve(url))
}

/**
 * 创建文件并写入数据
 * @param {String} url 
 * @param {String} blod 
 */
const createFile = (url, blod) => {
    fs.writeFileSync(resolve(url), blod)
}

/**
 * 读取模板内容并按照 $(变量名){变量值} 格式来替换其中的变量或读取其中的变量
 * @param {String} url 
 * @param {String} replaceObj 传了就是替换， 否则就是读取
 */
const readTemplateFile = (url, replaceObj) => {
    const fileStr = fs.readFileSync(resolve(url), {
        encoding: 'utf8'
    })
    const reg = /(\$\()(.*?)(\)\{)((.|\n)*?)(\})/g
    if (replaceObj) {
        // 替换变量并读取文件内容还有最新的变量
        const vars = {}
        const fileContent = fileStr.replace(reg, (m, $1, $2, $3, $4) => {
            vars[$2] = replaceObj[$2] || $4
            return `$(${$2}){${replaceObj[$2] || $4}}`
        })

        return { vars, fileContent }
    } else {
        // 读取其中的变量
        const vars = {}
        fileStr.replace(reg, (m, $1, $2, $3, $4) => {
            vars[$2] = $4
        })

        return { vars }
    }
}

/**
 * 自定增加版本号
 * @param { Number } type bigVer 1  , midVer 2,  smallVer 3
 */
const versionAutoAdd = (oldVersion, type = 3) => {
    let verInfo = vaildVersion(oldVersion)
    if (!verInfo.is) {
        return { error: '版本号格式错误！' }
    }

    const map = {
        1: 'bigVer',
        2: 'midVer',
        3: 'smallVer'
    }
    verInfo[map[type]]++
    const { bigVer, midVer, smallVer } = verInfo

    return { newVersion: `${bigVer}.${midVer}.${smallVer}` }
}
/**
 * 校验版本号是否正确
 * @param {String} version 
 * @returns {}
 */
const vaildVersion = (version) => {
    try {
        const reg = /([0-9]{1,})(\.)([0-9]{1,})(\.)([0-9]{1,})/g
        const [ ,bigVer,,midVer,,smallVer ] = reg.exec(version)
        return {
            is: true,
            bigVer,
            midVer,
            smallVer
        }
    } catch (error) {
        return {
            error,
            is: false
        }
    }
}

/**
 * 获取scripts 命令行参数 以 -- 开头
 */
const getScriptsArgs = () => {
    return process.argv.splice(2).map(arg => {
        return arg.replace('--', '')
    })
}

/**
 * 获取文件目录
 * @param {*} url 
 */
const readDir = (url) => {
    return fs.readdirSync(resolve(url))
}

module.exports = {
    resolve,
    fsIsExit,
    createFile,
    readTemplateFile,
    versionAutoAdd,
    vaildVersion,
    getScriptsArgs,
    readDir
}