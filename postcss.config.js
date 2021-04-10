
module.exports = {
    plugins: {
        'postcss-selector-namespace': {
            namespace(css) {
                if (css.includes('base.css')) return
                return ''
            }
        }
    }
}
