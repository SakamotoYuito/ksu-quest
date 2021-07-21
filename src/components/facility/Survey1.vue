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
                <span class="white-text">とても興味がある</span>
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
                <span class="white-text">他のコースも見てみたい</span>
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
    <footer>
      <div class="container">
        <div class="row">
          <div class="col s12">
            <a class="icon">
              <a
                v-if="!isIcon"
                @mousedown="focusColor"
                @touchstart="focusColor"
              >
                <font-awesome-icon icon="arrow-left" size="3x" />
              </a>
              <a
                v-if="isIcon"
                @mouseup="back"
                @touchend="back"
                @mouseover="basicColor"
                @touchmove="basicColor"
              >
                <font-awesome-icon icon="arrow-left" size="3x" color="gray" />
              </a>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </body>
</template>

<script>
import db from "@/plugins/firebase";
export default {
  name: "Survey1",
  data() {
    return {
      param: [],
      feedback: null,
      isClick: false,
      isIcon: false,
      labName: null,
      labStatus: null,
    };
  },
  created() {
    this.labName = this.$route.query.status;
    this.getLabStatus();
  },
  methods: {
    getLabStatus() {
      db.collection(this.$store.state.labStatusCollection)
        .get()
        .then((snapshot) => {
          snapshot.forEach((document) => {
            this.labStatus = document.data()[this.labName];
          });
        });
    },
    sendOut() {
      if (this.param) {
        this.$router.push({
          name: "Loading",
          params: {
            status: this.labStatus[this.param],
            place: this.labName,
            answer: this.param,
          },
        });
      } else {
        this.feedback = "選択してください";
      }
    },
    back() {
      if (!this.isClick) {
        this.$router.push({ name: "Status" });
        this.isClick = true;
        this.isIcon = false;
      }
    },
    focusColor() {
      this.isIcon = true;
    },
    basicColor() {
      this.isIcon = false;
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