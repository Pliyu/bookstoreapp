<template>
  <div class='card-cell-item'>
    <div class='card-cell-item-top'
    :style='{width: imgWidth, height: imgHeight}'>
      <img :src='pImgSrc' alt=''/>
      <p class='card-cell-item-top-marker'
      :style='{background: pMarkerBack}'
      v-if='pMarker'>{{ pMarker }}</p>
    </div>
    <div class='card-cell-item-bottom'>
      <div class='card-cell-item-bottom-title'>
        {{ pTitle }}
      </div>
      <div class='card-cell-item-bottom-spec'>
        <div class='card-cell-item-bottom-spec-price'>
          <span class='card-cell-item-bottom-spec-price-current'>
            ￥{{ pCurrentPrice }}
          </span>
          <span v-if='pOriginalPrice'
          class='card-cell-item-bottom-spec-price-original'>
            ￥{{ pOriginalPrice }}
          </span>
        </div>
        <div class='card-cell-item-bottom-spec-right'>
          <span>{{ pRightSpec }}</span>
        </div>
      </div>
      <slot name='bottom'></slot>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import { Component, Prop, Watch, Emit } from 'vue-property-decorator'
@Component
export default class BaseCard extends Vue {
  @Prop({ default: '' })
  pImgSrc!: string
  @Prop({ default: '' })
  imgWidth!: string
  @Prop({ default: '' })
  imgHeight!: string
  @Prop({ default: '' })
  pMarker!: string
  @Prop({ default: 'red' })
  pMarkerBack!: string
  @Prop({ default: '' })
  pTitle!: string
  @Prop({ default: '' })
  pCurrentPrice!: string
  @Prop({ default: '' })
  pRightSpec!: string
  @Prop({ default: '' })
  pOriginalPrice!: string
}
</script>
<style lang='less'>
@import '~@/style/variables.less';
.card-cell-item{
  width: 50%;
  border: 1px solid @gray5;
  &-top{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 220px;
    img{
      width: 100%;
      height: 100%;
      min-height: 220px;
    }
    &-marker{
      position: absolute;
      width: 100%;
      height: 15%;
      font-size: @large-font-size;
      top: 0;
      right: -35%;
      transform:rotate(45deg);
      color: @white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &-bottom{
    &-title{
      padding: 0 @small-horz-padding;
      font-size: @larger-font-size;
    }
    &-spec{
      display: flex;
      justify-content: space-between;
      margin: @small-horz-padding;
      align-items: baseline;
      &-price{
        display: inherit;
        &-current{
          color: @red;
          font-size: @h3-font-size;
        }
        &-original{
          color: @gray4;
          font-size: @larger-font-size;
          text-decoration:line-through
        }
      }
      &-right{
        color:@gray5;
        font-size: @large-font-size - 1;
      }
    }
  }
}
</style>
