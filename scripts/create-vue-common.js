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

    let fileBlob = ''
    if (vueCreatedType === 'component') {
        const { fileContent } = readTemplateFile(templateUrlMap[vueCreatedType], { componentClass: transformVarName(componentName), componentName }, false)
        fileBlob = fileContent
    }

    const createUrlMap = {
        component: `../src/components/${componentName}/index.vue`,
        filter: '',
        directive: ''
    }

    if (fileBlob) {
        console.log(`正在创建目录文件...`.green)
        createDirFile(createUrlMap[vueCreatedType], fileBlob)
        console.log(`组件${componentName}创建完成，请去../src/components/${componentName}/index.vue下开始编写组件吧`.green)
    }
    
}

init()



