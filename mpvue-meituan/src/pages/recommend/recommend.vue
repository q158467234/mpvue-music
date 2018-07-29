<!--<template>-->
<!--<div>-->
<!--&lt;!&ndash; <swiper-t :menu="menu"></swiper-t> &ndash;&gt;-->
<!--<div>test</div>-->
<!--&lt;!&ndash;<scroll-t :top="top" :active="active" @click="click"></scroll-t>&ndash;&gt;-->
<!--&lt;!&ndash;<middle-t @click="clickmid" :menu="menu" :midimg="midimg" :footimg="footimg" :footimg2="footimg2" :footimg3="footimg3" :footname1="'推荐歌单'" :footname2="'最新音乐'" :footname3="'主播电台'"></middle-t>&ndash;&gt;-->
<!--</div>-->
<!--</template>-->
<template>
  <div class="recommend" ref="recommend">
    <div ref="wrapper">
      <!--<scroll ref="scroll" class="recommend-content" :data="discList">-->
      <div>
        <swiper :menu="recommends"></swiper>
        <!--<div class="slider-wrapper" ref="sliderWrapper">-->
        <!--<div v-for="item in recommends" :key="item">-->
        <!--<a :href="item.linkUrl">-->
        <!--<img class="needsclick"  :src="item.picUrl">-->
        <!--</a>-->
        <!--</div>-->
        <!--</div>-->
        <div class="recommend-list">
          <h1 class="list-title">电台</h1>
          <ul>
            <li @click="selectItem(item)" v-for="item in radioList" :key="item" class="item">
              <div class="icon">
                <img width="60" height="60" :src="item.picUrl">
              </div>
              <div class="text">
                <p class="desc" v-html="item.Ftitle"></p>
              </div>
            </li>
          </ul>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="item in discList" :key="item" class="item">
              <div class="icon">
                <img width="60" height="60" :src="item.picUrl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.accessnum"></h2>
                <p class="desc" v-html="item.songListDesc"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--<div class="loading-container" v-show="!discList.length">-->
      <!--<loading></loading>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  // import middle from "@/components/middle/middle.vue";
  // import scroll from "@/components/scroll/scroll.vue";
  import {getRecommend, getDiscList} from '@/api/recommend';
  import {ERR_OK} from '@/api/config'
  import swiper from '@/components/swiper/swiper.vue'
  import {mapState, mapMutations, mapGetters} from 'vuex';

  export default {
    data() {
      return {
        recommends: [],
        discList: [],
        radioList: []
      }
    },
    created() {
      // this._getRecommend()

      this._getDiscList()
    },
    components: {
      'swiper': swiper
    },
    methods: {
      selectItem(item) {
        console.log('点击')
        // this.$router.push({
        //   path: `/recommend/${item.dissid}`
        // })
        // this.setDisc(item)
      },
      _getRecommend() {
        getRecommend().then((res) => {
          // console.log('getRecommend:')
          // console.log(res)
          if (res.data.code === ERR_OK) {
            this.recommends = res.data.data.slider
            this.discList = res.data.data.songList
            this.radioList = res.data.data.radioList
            console.log('getRecommend:')
            console.log(this.recommends)
          }
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          console.log('getDiscList测试:')
          console.log(res.data)
          if (res.data.code === ERR_OK) {
            this.discList = res.data.data.list

          }
        })
      },
      // ...mapMutations({
      //   // setDisc: 'SET_DISC'
      // })
    },

    // methods: {
    //   ...mapMutations({
    //     saveDetailState: 'SAVE_DETAIL_STATE',
    //     saveMidimg2: 'SAVE_MIDIMG2',
    //     saveMidimg3: 'SAVE_MIDIMG3'
    //   }),
    //   click(i){
    //     this.active = i+1
    //   },
    //   // getList () {
    //   //
    //   //   fly
    //   //     .get('https://www.easy-mock.com/mock/5b372361808a747e8d04a1e3/music#!method=get')
    //   //     .then(res => {
    //   //       this.menu = res.data.data.menu;
    //   //       this.midimg = res.data.data.midimg;
    //   //       this.saveMidimg2(res.data.data.midimg2);
    //   //       this.saveDetailState(res.data.data.footimg);
    //   //       this.saveMidimg3(res.data.data.midimg3);
    //   //       this.footimg2 = res.data.data.footimg2;
    //   //       this.footimg3 = res.data.data.footimg3;
    //   //     })
    //   //     .catch(e => {
    //   //       console.log(e);
    //   //     })
    //   // },
    //   _getRecommend() {
    //     getRecommend()
    //       .then((res) => {
    //       console.log('返回recommend')
    //       console.log(res)
    //       // if (res.code === ERR_OK) {
    //       //   this.recommends = res.data.slider
    //       // }
    //     })
    //   },
    //   _getDiscList() {
    //     getDiscList().then((res) => {
    //       console.log('返回DiscList')
    //       console.log(res)
    //       // if (res.code === ERR_OK) {
    //       //   this.discList = res.data.list
    //       // }
    //     })
    //   },
    // },
    //
    // created() {
    //   // 调用应用实例的方法获取全局数据
    //   this._getRecommend()
    //   this._getDiscList()
    //   // this.getList()
    // }
  };
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
</style>
