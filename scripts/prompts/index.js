const {
    vaildVersion,
    vaildComponentName,
    readDir,
    transformVarName
} = require('../utils')


const componentFileUrl = '../src/package/components'
function isSameComponentName (cname) {
    const dirs = readDir(componentFileUrl)
    return dirs.find(dir => dir === cname)
}
module.exports = {
    versionHandles: [
        {
            type: 'confirm',
            name: 'isSetVersion',
            message: '是否手动设置版本号？',
        },
        {
            type: 'input',
            name: 'version',
            message: '请输入合法的版本号：',
            when: (an) => {
                return an.isSetVersion
            },
            validate: (val) => {
                const { is } = vaildVersion(val)
                if (is) {
                    return true
                }
                return '版本号格式错误！'
            }
        }
    ],
    createdVueCommon: [
        {
            type: 'list',
            name: 'vueCreatedType',
            message: '请选择创建的类型：',
            choices: [
                {
                    name: 'components: Vue组件',
                    value: 'component',
                },
                {
                    name: 'filters: Vue过滤器',
                    value: 'filter',
                },
                {
                    name: 'directives: Vue指令',
                    value: 'directive',
                }
            ]
        },
        {
            type: 'input',
            name: 'componentName',
            message: '请输入你要创建的组件名（组件名必须为驼峰法）：',
            when: (an) => {
                return an.vueCreatedType === 'component'
            },
            validate: (val) => {
                if (!vaildComponentName(val)) return '组件名请输入驼峰法！'
                if (isSameComponentName(transformVarName(val))) return '已有该组件名字，请输入其他名字！'
                return true
            }
        }
    ]
        
}
