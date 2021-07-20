<template>
  <body v-if="isShow">
    <main>
      <div v-if="!isCorrect">
        <div class="notification">
          <p>{{ monsterName }}</p>
          <p>解答</p>
        </div>
        <div class="center-align">
          <form @submit.prevent="answerCheck">
            <div class="field">
              <input
                class="white-text"
                type="text"
                name="answer"
                placeholder="解答を入力"
                v-model="userAnswer"
              />
            </div>
            <a v-if="feedback" class="red-text">{{ feedback }}<br /></a>
            <button
              class="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              <a>解答する</a>
            </button>
          </form>
        </div>
      </div>
      <div v-if="isCorrect" class="circle">
        <a />
      </div>
      <div class="course center">
        <div v-if="isCorrect">
          <p>
            スキル
            <a>{{ courseName }}</a
            ><br />を手に入れた！
          </p>
          <p>
            解説を読んだら、下の 戻るボタン を押してステータスを確認しよう。
          </p>
          <img :src="courseImg" class="courseImg center" />
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
import firebase from "firebase";
export default {
  name: "Question1",
  props: [
    "correctAnswer",
    "monsterName",
    "courseName",
    "courseImg",
    "courseId",
    "rewards",
  ],
  data() {
    return {
      userAnswer: "",
      feedback: null,
      isClick: false,
      isIcon: false,
      isCorrect: false,
      isShow: false,
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        db.collection(this.$store.state.statusCollection)
          .where("uid", "==", user.uid)
          .get()
          .then((snapshot) => {
            snapshot.forEach((document) => {
              this.questActiveList = document.data().questActiveList;
              if (!this.questActiveList[this.courseId]) {
                this.questActiveList[this.courseId] = true;
                db.collection(this.$store.state.statusCollection)
                  .doc(document.id)
                  .update({
                    questActiveList: this.questActiveList,
                  });
                this.writeLog();
                this.$router.push({ name: "PostQuest" });
              } else {
                this.isShow = true;
              }
            });
          });
      }
    });
  },

  methods: {
    answerCheck() {
      for (let i = 0; i < this.correctAnswer.length; i++) {
        if (this.userAnswer == this.correctAnswer[i]) {
          this.isCorrect = true;
        } else {
          if (!this.isCorrect) {
            this.feedback =
              "解答が間違っています！わからないときは、スタッフに聞いてみよう。";
          }
        }
      }
    },
    writeLog() {
      const now = new Date();
      db.collection(this.$store.state.accesslogCollection).add({
        date: now,
        place: this.courseId,
        answer: "問題QRコード読み込み",
        uid: this.user.uid,
      });
    },
    back() {
      if (!this.isClick) {
        if (this.isCorrect) {
          this.$router.push({
            name: "Loading",
            params: {
              status: this.rewards,
              place: this.courseId,
              answer: this.userAnswer,
            },
          });
        } else {
          this.$router.push({ name: "Status" });
          this.isClick = true;
          this.isIcon = false;
          this.isCorrect = false;
        }
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
.circle {
  position: relative;
  margin: 60px auto;
  top: 15%;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100px;
  height: 100px;
  border: 12px solid red;
  border-radius: 50%;
  line-height: 80px;
}
.courseImg {
  width: 70%;
  height: auto;
  max-width: 300px;
  padding-bottom: 50px;
}
.course p {
  font-size: clamp(15px, 5vmin, 50px);
}
.course a {
  color: Yellow;
}
</style>
