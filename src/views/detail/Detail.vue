<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick" />
    <scroll
      class="content1"
      ref="scroll"
      :probe-type="3"
      @scroll="contentscroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <deatil-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommend" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addCart="addToCart" />
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import DetailNavBar from "./detalComps/DetailNavBar";
import DetailSwiper from "./detalComps/DetailSwiper";
import DetailBaseInfo from "./detalComps/DetailBaseInfo";
import DeatilShopInfo from "./detalComps/DeatilShopInfo";
import DetailCommentInfo from "./detalComps/DetailCommentInfo";
import DetailGoodsInfo from "./detalComps/DetailGoodsInfo";
import DetailParamInfo from "./detalComps/DetailParamInfo";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./detalComps/DetailBottomBar";
import BackTop from "components/content/backtop/BackTop";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail/";
import { debounce } from "common/utils";
import { itemListenrMixin } from "common/mixin";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DeatilShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
  },
  mixins: [itemListenrMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      itemImgLoad: null,
      themeTopYs: [],
      getThemeTopy: null,
      positionY: null,
      currentIndex: 0,
      isShowBackTop: false,
    };
  },
  created() {
    // 得到传入的iid
    this.iid = this.$route.params.iid;
    //根据iid请求详细数据
    getDetail(this.iid).then((res) => {
      // 轮播图数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      //商品数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 商铺信息数据
      this.shop = new Shop(data.shopInfo);
      //商品详细数据
      this.detailInfo = data.detailInfo;
      //参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      //DOM渲染完成后回调此函数 图片没有加载完 会有错误
      // this.$nextTick(() => {
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    });
    //请求推荐数据
    getRecommend().then((res) => {
      this.recommend = res.data.list;
    });
    // getThemeTop赋值 进行防抖 避免过于频繁
    this.getThemeTopy = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);
    }, 100);
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopy();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    contentscroll(position) {
      //获取滚动时Y值
      const positionY = -position.y;
      // 对比值
      let lengths = this.themeTopYs.length;
      for (let i = 0; i < lengths; i++) {
        if (
          this.currentIndex !== i &&
          ((i < lengths - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === lengths - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.isShowBackTop = -position.y > 1000;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    addToCart() {
      //获取购物车所需信息
      const product = {};
      product.iid = this.iid;
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      //添加到购物车并提示信息
      // this.$stroe.carList.push(product)
      // this.$store.commit("addCart", product);
      this.$store.dispatch("addCart", product).then((res) => {
        this.$toast.show(res, 2000);
        // console.log(this.$toast);
        // console.log(res);
      });
    },
  },

  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgLoad);
  },
};
</script>

<style  scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 999;
  background-color: #fff;
}
.content1 {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 50px;
  /* overflow: hidden; */
}

.detail-nav {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: #fff;
}
</style>