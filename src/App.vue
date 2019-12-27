<template>
  <div id="app">

    <keep-alive exclude="Detail">
        <router-view/>
    </keep-alive>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="home">
        <img slot="icon" src="@/assets/100x100.png">
        首頁
      </mt-tab-item>
      <mt-tab-item id="cart">
        <img slot="icon" src="@/assets/100x100.png">
        購物車
      </mt-tab-item>
      <mt-tab-item id="user">
        <img slot="icon" src="@/assets/100x100.png">
        用戶
      </mt-tab-item>

    </mt-tabbar>

  </div>
</template>
<script>
  export default {
    name: 'appPage',
    components: {},
    data() {
      return {
        selected: 'home'

      }
    },
    watch: {
        selected: function (val, oldVal) {
        // 这里就可以通过 val 的值变更来确定去向
        switch (val) {
          case "home":
            this.$router.push("/home");
            break;
          case "cart":
            this.$router.push("/cart");
            break;
          case "user":
            this.$router.push("/user");
            break;

        }
      }
    }
  }
</script>
<style>
</style>
