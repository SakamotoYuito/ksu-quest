<template>
  <body>
    <main>
      <div class="EmergencyQuest">
        <p>緊急クエストへのご参加<br />ありがとうございました！</p>
        <p>ステータス画面に戻ります</p>
        <div class="loader">Loading...</div>
      </div>
    </main>
    <footer>
      <div class="container">
        <div class="row">
          <div class="col s12">
            <a class="icon">
              <font-awesome-icon icon="arrow-left" size="3x" color="gray" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </body>
</template>

<script>
export default {
  name: "EmergencyQuest",
  created() {
    this.writeLog();
  },
  methods: {
    writeLog() {
      let rewards = ["Security:3"];
      setTimeout(() => {
        this.$router.push({
          name: "Loading",
          params: {
            status: rewards,
            place: "emergency",
            answer: "EmergencyQuest",
          },
        });
      }, 2000);
    },
  },
};
</script>

<style>
.EmergencyQuest {
  text-align: center;
  font-size: 5vmin;
}
</style>