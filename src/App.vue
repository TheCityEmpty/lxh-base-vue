<template>
  <div>
    <TextChangeStyle text="当买家付款后，需要您务必在$(font-size: 18px;color: #cf142b;){48小时内}，使用$(){顺丰速运或京东物流}将商品寄送至平台鉴定仓；由于卖家原因即未按时寄出或货品未通过鉴定，您支付的保证金将被扣除；若订单交易完成，保证金原路退回。如果您已完成卖家资质认证，详见保证金赔付标准"></TextChangeStyle>
    <ul> 
      <li v-for="source in sourceJson" :key="source.componentName">
        {{ source }}
      </li>
    </ul>
  </div>
</template>

<script>
import sourceJson from './sourceJson.js'
export default {
  data () {
    return {
      sourceJson
    }
  },
  created () {
    console.log(sourceJson)
  }
}
</script>