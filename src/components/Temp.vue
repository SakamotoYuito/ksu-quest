<template>
  <body>
    <main>
      <div class="temp">
        <p>{{ message }}</p>
      </div>
    </main>
  </body>
</template>

<script>
export default {
  name: "Temp",
  data() {
    return {
      message: "",
    };
  },
  mounted() {
    let urlStatus = this.$route.query.status;
    let urlPlace = this.$route.query.place;
    let urlStatusList = [];
    if (!Array.isArray(urlStatus)) {
      urlStatusList.push(urlStatus);
    } else {
      urlStatusList = urlStatus;
    }
    if (urlPlace == null) {
      urlPlace = "臨時措置";
    }
    if (urlStatusList) {
      this.message = "反映中です．．．";
      setTimeout(() => {
        this.$router.push({
          name: "Loading",
          params: {
            status: urlStatusList,
            place: urlPlace,
            answer: urlStatusList,
          },
        });
      }, 2000);
    } else {
      this.message = "パラメータを設定してください";
    }
  },
};
</script>

<style>
.temp {
  margin-top: 50px;
  text-align: center;
  font-size: 5vmin;
}
</style>