<template>
  <footer v-if="!isHome && !isSignup">
    <div class="container">
      <div class="row">
        <div class="col s3" @click="movePage('Status')">
          <font-awesome-icon
            icon="chart-pie"
            size="2x"
            :style="{ color: isFocus('chart-pie') }"
          />
        </div>

        <div class="col s3" @click="movePage('Reader')">
          <font-awesome-icon
            icon="camera"
            size="2x"
            :style="{ color: isFocus('camera') }"
          />
        </div>

        <div class="col s3" @click="movePage('PostQuest')">
          <font-awesome-icon
            icon="list"
            size="2x"
            :style="{ color: isFocus('list') }"
          />
        </div>

        <div class="col s3" @click="movePage('Notification')">
          <font-awesome-icon
            icon="bell"
            size="2x"
            color="white"
            :style="{ color: isFocus('bell') }"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      isHome: true,
      isSignup: true,
    };
  },
  watch: {
    $route: function () {
      this.isHome = this.$router.history.current.name === "Home";
      this.isSignup = this.$router.history.current.name === "Signup";
    },
  },
  mounted() {
    this.isHome = this.$router.history.current.name === "Home";
    this.isSignup = this.$router.history.current.name === "Signup";
  },
  methods: {
    isFocus(iconName) {
      if (iconName == this.getPageName()) {
        return "#43f060";
      }
      return "white";
    },
    getPageName() {
      switch (this.$route.name) {
        case "Reader":
          return "camera";
        case "Notification":
          return "bell";
        case "PostQuest":
          return "list";
        case "Status":
          return "chart-pie";
        default:
          return "other";
      }
    },
    movePage(pageName) {
      if (this.$route.name == pageName || this.$route.name == "Loading") {
        return;
      }
      this.$router.push({ name: pageName });
    },
  },
};
</script>

<style>
</style>