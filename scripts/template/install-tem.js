const install = (Vue) => {
    const files = require.context('./', true, /index\.vue$/)
    files.keys().forEach((item) => {
        Vue.component(files(item).default.name, files(item).default)
    })
}

export default {
    version: '$(version){1.0.0}',
    install
}
