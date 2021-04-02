const {
    vaildVersion
} = require('../utils')

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
            message: '请输入合法的版本号！',
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

    ]
        
}
