<template>
  <body>
    <main>
      <div>
        <div class="notification">
          <p>アンケート</p>
        </div>
        <p>
          10コースの中で興味のあるコースはありますか？ 3つまで選んでください。
        </p>
        <hr />
        <div>
          <form class="survey" @submit.prevent="sendOut">
            <p class="left">
              <label>
                <input
                  class="with-gap"
                  id="0"
                  name="group1"
                  :disabled="notCheck[0]"
                  type="checkbox"
                  @change="checkLimit"
                  v-model="param[0]"
                />
                <span class="white-text">ネットワークシステムコース</span>
              </label>
            </p>
            <p class="left">
              <label>
                <input
                  class="with-gap"
                  id="1"
                  name="group1"
                  :disabled="notCheck[1]"
                  type="checkbox"
                  @change="checkLimit"
                  v-model="param[1]"
                />
                <span class="white-text">情報セキュリティコース</span>
              </label>
            </p>
            <p class="left">
              <label>
                <input
                  class="with-gap"
                  id="2"
                  name="group1"
                  :disabled="notCheck[2]"
                  type="checkbox"
                  @change="checkLimit"
                  v-model="param[2]"
                />
                <span class="white-text">データサイエンスコース</span>
              </label>
            </p>
            <p class="left">
              <label>
                <input
                  class="with-gap"
                  id="3"
                  name="group1"
                  :disabled="notCheck[3]"
                  type="checkbox"
                  @change="checkLimit"
                  v-model="param[3]"
                />
                <span class="white-text">ロボットインタラクションコース</span>
              </label>
            </p>
            <p class="left">
              <label>
                <input
                  class="with-gap"
                  id="4"
                  name="group1"
                  :disabled="notCheck[4]"
                  type="checkbox"
                  @change="checkLimit"
                  v-model="param[4]"
                />
                <span class="white-text">コンピュータ基盤設計コース</span>
              </label>
            </p>
            <p class="left">
              <label>
                <input
                  class="with-gap"
                  id="5"
                  name="group1"
                  :disabled="notCheck[5]"
                  type="checkbox"
                  @change="checkLimit"
                  v-model="param[5]"
                />
                <span class="white-text">組込みシステムコース</span>
              </label>
            </p>
            <p class="left">
              <label>
                <input
                  class="with-gap"
                  id="6"
                  name="group1"
                  :disabled="notCheck[6]"
                  type="checkbox"
                  @change="checkLimit"
                  v-model="param[6]"
                />
                <span class="white-text">デジタルファブリケーションコース</span>
              </label>
            </p>
            <p class="left">
              <label>
                <input
                  class="with-gap"
                  id="7"
                  name="group1"
                  :disabled="notCheck[7]"
                  type="checkbox"
                  @change="checkLimit"
                  v-model="param[7]"
                />
                <span class="white-text">脳科学コース</span>
              </label>
            </p>
            <p class="left">
              <label>
                <input
                  class="with-gap"
                  id="8"
                  name="group1"
                  :disabled="notCheck[8]"
                  type="checkbox"
                  @change="checkLimit"
                  v-model="param[8]"
                />
                <span class="white-text">メディア処理技術コース</span>
              </label>
            </p>
            <p class="left">
              <label>
                <input
                  class="with-gap"
                  id="9"
                  name="group1"
                  :disabled="notCheck[9]"
                  type="checkbox"
                  @change="checkLimit"
                  v-model="param[9]"
                />
                <span class="white-text">情報システムコース</span>
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
      param: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      notCheck: [],
      feedback: null,
      isClick: false,
      isIcon: false,
      labStatus: {
        EntranceTest: [
          "Network:1",
          "Security:1",
          "DataScience:1",
          "Robot:1",
          "Infrastructure:1",
          "IoT:1",
          "Fabrication:1",
          "Brain:1",
          "Media:1",
          "SE:1",
        ],
      },
    };
  },
  methods: {
    sendOut() {
      let labName = "EntranceTest";
      let courseName = [];
      if (this.param) {
        for (let i = 0; i < this.param.length; i++) {
          if (this.param[i]) {
            courseName.push(this.labStatus[labName][i]);
          }
        }
        this.$router.push({
          name: "Loading",
          params: {
            status: courseName,
            place: labName,
            answer: courseName,
          },
        });
      } else {
        this.feedback = "選択してください";
      }
    },
    checkLimit() {
      this.notCheck = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ];
      let count = 0;
      for (let i = 0; i < this.param.length; i++) {
        if (this.param[i]) {
          count = count + 1;
          if (count == 3) {
            for (let i = 0; i < this.param.length; i++) {
              if (!this.param[i]) {
                this.notCheck[i] = true;
              }
            }
            break;
          }
        }
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
  z-index: 0;
  margin-bottom: 60px;
}
[type="checkbox"] + span:not(.lever):before,
[type="checkbox"]:not(.filled-in) + span:not(.lever):after {
  border: 2px solid white;
}
[type="checkbox"]:checked + span:not(.lever):before {
  border-right: 2px solid lime;
  border-bottom: 2px solid lime;
}
</style>