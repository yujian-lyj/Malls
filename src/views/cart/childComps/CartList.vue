<template>
  <div class="cart-list">
    <!-- <scroll class="content" ref="scroll"> -->
    <cart-list-item
      v-for="(item, index) in cartList"
      :product="item"
      :key="index"
    />
    </scroll>
  </div>
</template>

<script>
// import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
import { mapGetters } from "vuex";

export default {
  components: {
    //  Scroll,
    CartListItem,
  },
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"]),
  },
  // actived() {
  //   this.$refs.scroll.refresh();
  // },
};
</script>

<style scoped>
</style>