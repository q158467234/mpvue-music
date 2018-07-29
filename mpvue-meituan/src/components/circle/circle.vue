<template>
<div class="middle" v-show="midshow" @click="changeshow">
    <div class="cirmid" >
        <div class="cirmiddle">
            <img :src="img" class="circle" :class="circle">
        </div>
        <mid :midimg="songBar" :sty="isstyle2"></mid>
    </div>
</div>

</template>

<script>
import mid from '@/components/mid/mid.vue'
export default {
    data(){
        return {
            isstyle2: true,
            midshow: false,
            songBar: [
              {
                "id": 1,
                "url": "/static/images/index/like.png",
                "text": ""
              },
              {
                "id": 2,
                "url": "/static/images/index/xiazai.png",
                "text": ""
              },
              {
                "id": 3,
                "url": "/static/images/index/ping.png",
                "text": ""
              },
              {
                "id": 4,
                "url": "/static/images/index/sl.png",
                "text": ""
              }
            ],
        }
    },
    computed:{
        circle () {
            return this.playing?'play':'play pause'
        }
    },
    methods: {
        changeshow () {
            this.$emit('click')
        },
    },
    props:['img','midimg3','playing','midshow'],
    components:{
        'mid':mid
    },
}
</script>

<style lang="stylus">
.middle
    width 100%
    height 70%
    position absolute
    display flex
    .cirmid
        margin-top 120rpx
        width 100%
        height 600rpx
        .cirmiddle
            width 80%
            margin-left 10%
            margin-right 10%
            height 100%
            display  flex
            align-items center
            justify-content center
            .circle
                width 500rpx
                height 500rpx
                border-radius 50%
                border 15px solid rgba(255,255,255,.1)
                &.play
                    animation: rotate 20s linear infinite
                &.pause
                    animation-play-state: paused

.mid.sty
    margin-top 400rpx
</style>
 <style>
  @keyframes rotate {
  0%{
    transform: rotate(0);}
  100%  {
       transform: rotate(360deg);
  }
    }
 </style>

