<template>
  <div class="bottom-bar">
    <div class="checked">
      <check-button
        :is-checked="isSelectAll"
        @click.native="checkedClick"
        class="check-all"
      />
      <span class="text">全选</span>
    </div>
    <div class="price">合计：{{ totalPrice }}</div>
    <div class="calculate" @click="ToCalculate">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  components: { CheckButton },
  name: "CartBottomBar",
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return (preValue += item.price * item.count);
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      return !this.$store.state.cartList.filter((item) => !item.checked).length;
    },
  },
  methods: {
    checkedClick() {
      if (this.isSelectAll) {
        //全选
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        //部分选或全都不选
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
    ToCalculate() {
      if (!this.isSelectAll) {
        return this.$toast.show("未选择商品");
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  bottom: 50px;
  display: flex;
  height: 40px;
  width: 100%;
  background-color: #eee;
}
.checked {
  display: flex;
  margin-top: 8px;
  margin-left: 5px;
  width: 60px;
}
.text {
  line-height: 22px;
  margin-left: 5px;
}
.check-all {
  width: 22px;
  height: 22px;
}
.price {
  margin-left: 20px;
  margin-top: 10px;
  flex: 1;
}
.calculate {
  width: 90px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background-color: red;
}
</style>