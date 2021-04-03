<template>
    <div class="left-bar">
        <ul>
            <li v-for="(cItem, cIndex) in sourceJson" :key="cIndex">
                
            </li>
        </ul>
    </div>
</template>

<script>
import sourceJson from '../../sourceJson.js'
export default {
    data () {
        return {
            sourceJson
        }
    }
}
</script>