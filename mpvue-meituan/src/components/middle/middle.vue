<template>
    <scroll-view scroll-y="true" enable-back-to-top="true" class="mid-top">
      <swiper :siderList="sider"></swiper>
      <mid :midimg="midimg"></mid>
      <show :showList="discList" :showTitle="discTitle"></show>
      <show :showList="radioList" :showTitle="radioTitle"></show>
    </scroll-view>
</template>

<script>
import swiper from '@/components/swiper/swiper.vue'
import mid from '@/components/mid/mid.vue'
import show from '@/components/show/show.vue'
export default {
    data(){
        return {

        }
    },
    components:{
        'swiper':swiper,
        'mid':mid,
        'show':show
    },
    props:['sider','midimg','discList','discTitle','radioList','radioTitle']
}
</script>

<style lang="stylus">
.mid-top
  padding-top 80rpx
  width 100%
  height 2740rpx
  z-index 0
  background #E3453A
  position relative
  overflow hidden
</style>
