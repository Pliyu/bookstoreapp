<template>
  <div>
    <van-card
    :thumb='pThumb'
    :title='pTitle'
    :desc='pDesc'
    :tag='pTag'
    :num='pNum'
    :price='pPrice'
    :origin-price='pOriginPrice'
    :centered='pCentered'
    :currency='pCurrency'
    :thumb-link='pThumbLink'
    :lazy-load='pLazyLoad'
    @click='onClickItem'
    @click-thumb='onClickThumb'>
      <slot name='num' slot='num'></slot>
    </van-card>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import { Component, Prop, Watch, Emit } from 'vue-property-decorator'
@Component({
  components: {
  }
})
export default class CartItem extends Vue {
  @Prop({ default: '' })
  private pThumb!: string
  @Prop({ default: '' })
  private pTitle!: string
  @Prop({ default: '' })
  private pDesc!: string
  @Prop({ default: '' })
  private pTag!: string
  @Prop({ default: '' || 0 })
  private pNum!: any
  @Prop({ default: '' || 0 })
  private pPrice!: any
  @Prop()
  private pOriginPrice!: any
  @Prop({ default: false })
  private pCentered!: boolean
  @Prop({ default: '￥' })
  private pCurrency!: string
  @Prop({ default: '' })
  private pThumbLink!: string
  @Prop({ default: false })
  private pLazyLoad!: boolean

  @Emit('click')
  public onClickItem (): void {}
  @Emit('click-thumb')
  public onClickThumb (): void {}
}

</script>
<style lang='less'>
</style>
