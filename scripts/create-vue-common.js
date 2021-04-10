const {
    createDirFile,
    readTemplateFile,
    transformVarName
} = require('./utils')

const prompsConfig = require('./prompts')
const inquirer = require('inquirer')
// 引入colors 添加字符串函数劫持， 虽然没用过，但是是必须的
const colors = require('colors')
const templateUrlMap = {
    component: './template/components-tem.vue',
    filter: '',
    directive: ''
}


async function init () {
    const { vueCreatedType, componentName } = await inquirer.prompt(prompsConfig.createdVueCommon)
    const componentClassName = transformVarName(componentName)

    let fileBlob = ''
    if (vueCreatedType === 'component') {
        const { fileContent } = readTemplateFile(templateUrlMap[vueCreatedType], { componentClass: componentClassName, componentName }, false)
        fileBlob = fileContent
    }

    const createUrlMap = {
        component: `../src/package/components/${componentClassName}/index.vue`,
        filter: '',
        directive: ''
    }

    if (fileBlob) {
        console.log(`正在创建目录文件...`.green)
        // 创建.vue
        createDirFile(createUrlMap[vueCreatedType], fileBlob)
        // 创建.lcss
        createDirFile(`../src/package/style/${componentClassName}.css`)
        console.log(`组件${componentName}创建完成，请去../src/package/components/${componentName}/index.vue下开始编写组件吧`.green)
    }
    
}

init()



