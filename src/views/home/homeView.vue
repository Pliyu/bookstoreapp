<template>
  <div class='hv-doc'>
    <div class='hv-doc-header'>
      <van-swipe :autoplay='2000'>
        <van-swipe-item v-for='(image, index) in swipeImages'
        :key='index'>
          <img class='hv-doc-header-img' :src="image" alt='' />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- <base-card
    p-img-src='https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1572616428&di=4ebdaf57a6d7b5785a2193d54feaf8db&src=http://b-ssl.duitang.com/uploads/item/201303/24/20130324094837_HzZms.jpeg'
    p-marker='书本'
    pTitle='好书'
    pCurrentPrice='123'
    pOriginalPrice='222'
    pRightSpec='销量2134'></base-card> -->
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import { Component, Prop, Watch, Emit } from 'vue-property-decorator'
import BaseCard from '@/components/baseCard.vue'
@Component({
  components: {
    BaseCard
  }
})
export default class componentName extends Vue {
  public swipeImages: Array<string> = [
    'https://www.zhidiy.com/uploadfile/201309/28/104399421.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572684183167&di=93b6ea0ff90f352846a121bac755eb81&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz%2Fd7OwMvE5AHC86ZRRZbZO7vwskpOaELxLc4o7Tn94FkMEg1iciaM3R3c4NDg21BUicHxAlJl3jS7vVLxOKS8A6AzTg%2F0',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572684183166&di=9e63189f088290a7672ed95a92d7f01e&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F17%2F05%2F26%2F623c19fa602ebe3aa563fe71e8033760.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572684236064&di=e916299095a97d57fddc233a00326043&imgtype=jpg&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D2908872665%2C2425448822%26fm%3D214%26gp%3D0.jpg'
  ]
}
</script>
<style lang='less'>
@import '~@/style/variables.less';
@import '~@/style/mixins.less';
.hv-doc{
  &-header{
    &-img{
      .mixin-max-wh();
      width: 100%;
      max-height: 300px;
    }
  }
}
</style>
