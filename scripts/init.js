const {
    createFile,
    readTemplateFile,
    versionAutoAdd,
    getScriptsArgs,
    readDir
} = require('./utils')

const args = getScriptsArgs()
const isPrd = !!args.find(arg => arg === 'prd')

const prompsConfig = require('./prompts')
const inquirer = require('inquirer')
// 引入colors 添加字符串函数劫持， 虽然没用过，但是是必须的
const colors = require('colors')

const initFileUrl = '../src/components/index.js'
const installTempalteUrl = './template/install-tem.js'
const componentsEgUrl = '../src/eg'

async function init () {
    // 处理install 文件，该文件主要用于全局注册组件等
    handleInstallFile()
    readVueEgFile()
}

async function handleInstallFile () {
    let newVersion = '1.0.0'
    // 生产环境处理
    if (isPrd) {
        let { isSetVersion, version } = await inquirer.prompt(prompsConfig.versionHandles)
        let oldVersion = ''
        newVersion = version
        if (!isSetVersion) {
            // 自动设置版本 +1
            const { vars: { version } } = readTemplateFile(installTempalteUrl)
            oldVersion = version

            const { newVersion: addBeforeVersion } = versionAutoAdd(oldVersion)
            newVersion = addBeforeVersion

            console.log('...正在自动设置版本号，上个版本号为' + oldVersion.yellow + '。新的版本号为' + newVersion.green)
        }
    }
    
    // 读取模板文件并获取模板文件内容
    const { fileContent } = readTemplateFile(installTempalteUrl, { version: newVersion })
    // 初始化index.js
    createFile(initFileUrl, fileContent)
    // 对模板文件进行修改，保证模板文件的版本号是最新的
    isPrd && createFile(installTempalteUrl, fileContent)
}

async function readVueEgFile () {
    const sourceJson = {}
    const dirs = readDir(componentsEgUrl)
    dirs.forEach(dir => {
        const { fileContent } = readTemplateFile(`${componentsEgUrl}/${dir}/index.vue`, {})
        sourceJson[dir] = {
            componentName: dir,
            content: fileContent.replace(/\n/g, '<br />')
        }
    })

    createFile('../src/sourceJson.js', `export default ${JSON.stringify(sourceJson)}`)
}


init()
