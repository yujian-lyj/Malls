<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list />
    </scroll>
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import Scroll from "components/common/scroll/Scroll";
import CartBottomBar from "./childComps/CartBottomBar";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar,
  },
  computed: {
    //两种语法
    ...mapGetters(["cartLength"]),
    // ...mapGetters({
    //   length: "cartLength",
    //   list: "cartList",
    // }),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style  scoped>
.cart {
  height: 100vh;
  position: relative;
}
.nav-bar {
  position: relative;
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 500;
  z-index: 9999;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 99px;
  left: 0;
  right: 0;
}
</style>