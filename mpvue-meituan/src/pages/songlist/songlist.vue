<template>
      <scroll-view scroll-y="true" enable-back-to-top="true" class="top">
        <list-top :data="data" :songBar="songBar"></list-top>
        <div class="middle">
          <div class="middle-top">
            <img class="play" src="/static/images/index/play.png" style="width:45rpx;height:45rpx"/>
            <span class="txt1">播放全部</span>
            <span class="txt2">(共0首)</span>
            <div class="middle-top-right">
              <span><span class="add">+</span> 收藏</span>
            </div>
          </div>
          <a :href="'/pages/player/main?id='+data.id+'&songid='+list.id+'&name='+list.name" v-for="list of songList" :key="list.id" class="middle-mid">
            <div class="middle-num">{{list.duration}}</div>
            <div class="middle-right">
              <div class="middle-name">
                <span class="middle-listname">{{list.name}}</span>
                <span class="middle-singname">{{list.singer}}</span>
              </div>
              <img class="middle-more" src="/static/images/index/more.png">
            </div>
          </a>
        </div>
      </scroll-view>
</template>

<script>
import fly from '@/utils/flyio';
import listtop from '@/components/listtop/listtop'
import { mapState, mapMutations, mapGetters } from 'vuex';
import { getSongList} from '@/api/recommend';
import { createSong,initSong} from '@/api/song';
import {ERR_OK} from '@/api/config'

export default {
  data() {
    return {
      songBar: [
        {
          "id": 1,
          "url": "/static/images/index/ping.png",
          "text": "评论"
        },
        {
          "id": 2,
          "url": "/static/images/index/share.png",
          "text": "分享"
        },
        {
          "id": 3,
          "url": "/static/images/index/xiazai.png",
          "text": "下载"
        },
        {
          "id": 4,
          "url": "/static/images/index/duoxuan.png",
          "text": "多选"
        }
      ],
      data:{},
      songList:[],
    };
  },
  computed: {
     ...mapGetters([
        'discList',
        'data',
      ]),
  },
  components:{
    'list-top':listtop
  },
  methods: {
    ...mapMutations({
      saveSonglist:'SAVE_SONGLIST'
    }),
    _getSongList(songId) {
      // getSongList(songId)
      getSongList(songId).then((res) => {
        // console.log('getsong返回');
        // console.log(res);
        if (res.code === ERR_OK) {
          console.log(res);
          this.songList = this._normalizeSongs(res.cdlist[0].songlist)
          let options = this.$root.$mp.query;
          this.data = {
            id:options.id,
            picUrl:options.picUrl,
            singer:options.singer,
            songList:this.songList
          }

          this.saveSonglist(this.data)
          console.log(this.data)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albummid) {
          // console.log(musicData)
          // getMusic(musicData.songmid).then((res) => {
          //   if (res.code === ERR_OK) {
          //     const svkey = res.data.items
          //     const songVkey = svkey[0].vkey
          //     const newSong = createSong(musicData, songVkey)
          //     ret.push(newSong)
          //   }
          // })
          ret.push(initSong(musicData))
        }
      })
      return ret
    }
  },
  mounted() {
    let options = this.$root.$mp.query;
    wx.showLoading({
            title: '加载中'
        })
    this._getSongList(options.id)
    setTimeout(() => {
      wx.hideLoading()
    },2500)
    // if (this.data.playCount != 'undefined') {
    //       for (var i = 0; i < this.discList.length; i++) {
    //         if (this.data.id == this.discList[i].id) {
    //           this.saveSonglist(this.discList[i]);
    //           break
    //         }
    //       }
    //     wx.hideLoading()
    // }else if(this.data.singer != 'undefined'){
    //     fly
    //     .get("https://www.easy-mock.com/mock/5b372361808a747e8d04a1e3/music#!method=get")
    //     .then(res => {
    //       let re = res.data.data.footimg2;
    //       for (var i = 0; i < re.length; i++) {
    //         if (this.data.id == re[i].id) {
    //           Object.assign(this.data, re[i]);
    //           break
    //         }
    //       }
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // }
  },
  onShow() {
    wx.setNavigationBarTitle({
      // 设置当前标题
      title: decodeURIComponent("歌单")
    });
  }
};

</script>

<style lang="stylus">
::-webkit-scrollbar
  width: 0
  height: 0
  color: transparent
*
  margin 0
  border 0
.top
  width 100%
  height 1480rpx
  z-index 0
  position relative
  overflow hidden
  box-sizing border-box
  .middle
    position absolute
    width 100%
    top 500rpx
    z-index 2
    background-color #fff
    border-top-left-radius 25rpx
    border-top-right-radius 25rpx
    .middle-top
      display flex
      width 100%
      height 80rpx
      align-items center
      border-bottom 1px solid #E2E3E4
      .play
        margin-left 3%
        margin-right 3%
      .txt1
        font-weight 500
        font-size 35rpx
      .txt2
        color #979798
        font-weight 300
        font-size 30rpx
      .middle-top-right
        width 30%
        height 80rpx
        margin-left: auto
        background #E3453A
        color #ffffff
        text-align center
        align-items center
        display flex
        border-top-right-radius 25rpx
        justify-content space-around;
        font-size 35rpx
        font-weight 300
        .add
          font-size 40rpx
    .middle-mid
      display flex
      width 100%
      height 100rpx
      align-items center
      font-size 30rpx
      font-weight 300
      .middle-num
        width 6%
        height 100rpx
        display flex
        align-items center
        margin-left 3%
        margin-right 3%
        justify-content: center
        color #979798
      .middle-right
        width 88%
        height 100rpx
        border-bottom 1px solid #E2E3E4
        display flex
        align-items center
        .middle-name
          margin-top 10rpx
          height 80rpx
          width 400rpx
          display flex
          font-size 35rpx
          flex-direction column
          .middle-listname
            padding-top 0 rpx
          .middle-singname
            font-size 28rpx
            color #979798
        .middle-more
          margin-left: auto
          margin-right 30rpx
          width 50rpx
          height 50rpx
</style>
