<template>
  <body>
    <main>
      <div>
        <div class="notification">
          <p>アンケート</p>
        </div>
        <p>今回の内容はどうでしたか？</p>
        <hr />
        <div>
          <form class="survey" @submit.prevent="sendOut">
            <p class="left">
              <label>
                <input
                  class="with-gap"
                  id="0"
                  value="0"
                  name="group1"
                  type="radio"
                  v-model="param"
                />
                <span class="white-text">とても面白かった</span>
              </label>
            </p>
            <p class="left">
              <label>
                <input
                  class="with-gap"
                  id="1"
                  value="1"
                  name="group1"
                  type="radio"
                  v-model="param"
                />
                <span class="white-text">興味が湧いた</span>
              </label>
            </p>
            <p class="left">
              <label>
                <input
                  class="with-gap"
                  id="2"
                  value="2"
                  name="group1"
                  type="radio"
                  v-model="param"
                />
                <span class="white-text">難しかった</span>
              </label>
            </p>
            <a v-if="feedback" class="red-text center">{{ feedback }}<br /></a>
            <button
              class="btn waves-effect waves-light center"
              type="submit"
              name="action"
            >
              <a>送信する</a>
            </button>
          </form>
        </div>
      </div>
    </main>
  </body>
</template>

<script>
export default {
  name: "Question1",
  data() {
    return {
      param: [],
      feedback: null,
      isClick: false,
      isIcon: false,
      labStatus: {
        Fabspace: [
          ["Fabrication:3"],
          ["Fabrication:2", "Robot:1"],
          ["Fabrication:2", "Robot:1"],
        ],
      },
    };
  },
  methods: {
    sendOut() {
      let labName = "Fabspace";
      if (this.param) {
        this.$router.push({
          name: "Loading",
          params: {
            status: this.labStatus[labName][this.param],
            place: labName,
            answer: this.param,
          },
        });
      } else {
        this.feedback = "選択してください";
      }
    },
  },
};
</script>

<style>
.survey {
  display: flex;
  flex-direction: column;
  align-items: left;
}
.survey .btn {
  margin-left: 20%;
  margin-right: 20%;
}
[type="radio"]:not(:checked) + span:before,
[type="radio"]:not(:checked) + span:after {
  border: 2px solid white;
}
[type="radio"]:checked + span:after,
[type="radio"].with-gap:checked + span:after {
  background-color: lime;
}
[type="radio"]:checked + span:after,
[type="radio"].with-gap:checked + span:before,
[type="radio"].with-gap:checked + span:after {
  border: 2px solid lime;
}
</style>