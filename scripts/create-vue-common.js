const {
    createDirFile,
    readTemplateFile,
    
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
        const { fileContent } = readTemplateFile(templateUrlMap[vueCreatedType], { componentClass: componentName, componentName })
        fileBlob = fileContent
    }

    const createUrlMap = {
        component: `../src/components/${componentName}/index.vue`,
        filter: '',
        directive: ''
    }

    if (fileBlob) {
        createDirFile(createUrlMap[vueCreatedType], fileBlob)
    }
    
}

init()



