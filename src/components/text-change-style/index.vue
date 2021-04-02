<template>
    <span v-html="changeText"></span>
</template>

<script>
    export default {
        name: 'TextChangeStyle',
        props: {
            text: {
                type: String,
                default: ''
            },
            defaultStyle: {
                type: String,
                default: 'color: #cf142b;'
            }
        },
        computed: {
            changeText() {
                // $(style){text}
                return this.text.replace(/\n/g, '<br />')
                    .replace(/(\$\()(.*?)(\)\{)((.|\n)*?)(\})/g, (m, $1, $2, $3, $4) => {
                        return `<span style="${$2 || this.defaultStyle}">${$4}</span>`
                })
            }
        }
    }
</script>
