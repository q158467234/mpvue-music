<template>
<div>
  <!-- <swiper-t :menu="menu"></swiper-t> -->
  <scroll :top="top" :active="active" @click="click"></scroll>
  <middle @click="clickmid" :sider="siderList" :midimg="midimg" :discList="discList" :radioList="radioList" :discTitle="'推荐歌单'" :radioTitle="'电台'"></middle>
</div>
</template>

<script>
import middle from "@/components/middle/middle.vue";
import scroll from "@/components/scroll/scroll.vue";
import fly from '@/utils/flyio';
import {ERR_OK} from '@/api/config'
import { getRecommend }from '@/api/recommend';
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
  data() {
    return {
      midimg: [
        {
          "id": 1,
          "url": "/static/images/index/fm.png",
          "text": "私人FM"
        },
        {
          "id": 2,
          "url": "/static/images/index/date.png",
          "text": "每日推荐"
        },
        {
          "id": 3,
          "url": "/static/images/index/song.png",
          "text": "歌单"
        },
        {
          "id": 4,
          "url": "/static/images/index/pai.png",
          "text": "排行榜"
        }
      ],
      siderList:[],
      radioList: [],
      discList: [],
      top: [
        {
          id: "left",
          name: "推荐"
        },
        {
          id: "content",
          name: "朋友"
        },
        {
          id: "right",
          name: "电台"
        }
      ],
      active: 1
    };
  },
  computed: {
    // ...mapGetters([
    //     'siderList',
    //   ]),
  },

  components: {
    "middle": middle,
    "scroll": scroll
  },

  methods: {
    ...mapMutations({
      saveDiscList: 'SAVE_DISCLIST',
      saveRadioList: 'SAVE_RADIOLIST',
      saveSiderList: 'SAVE_SIDERLIST'
    }),
    click(i){
      this.active = i+1
    },
    getList () {
      getRecommend().then((res) => {
        console.log('进入index方法')
        // console.log(res)
        if (res.data.code === ERR_OK) {
          this.siderList = res.data.data.slider
          this.discList = res.data.data.songList
          this.radioList = res.data.data.radioList
          console.log('recommned.data:')
          console.log(res.data.data)
        }
      })
      //  fly
      // .get('https://www.easy-mock.com/mock/5b372361808a747e8d04a1e3/music#!method=get')
      // .then(res => {
      //   console.log('进入index');
      //   console.log(res);
      //     this.menu = res.data.data.menu;
      //     this.midimg = res.data.data.midimg;
      //     this.saveMidimg2(res.data.data.midimg2);
      //     this.saveDetailState(res.data.data.footimg);
      //     this.saveMidimg3(res.data.data.midimg3);
      //     this.footimg2 = res.data.data.footimg2;
      //     this.footimg3 = res.data.data.footimg3;
      // })
      // .catch(e => {
      //   console.log(e);
      // })
    },
  },

  created() {
    // 调用应用实例的方法获取全局数据
   this.getList()
  }
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
