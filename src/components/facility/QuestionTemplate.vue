<template>
  <body>
    <main>
      <div class="confirm center-align" v-if="isConfirm">
        <div class="card-panel white">
          <p class="questTitle1">スキル<br />{{ courseName }}</p>
          <p class="questTitle2">を手に入れろ！</p>
        </div>
        <p class="message">このQuestを受注しますか？</p>
        <div class="row">
          <a class="waves-effect cancel btn col s6" @click="cancelQuest">
            キャンセル
          </a>
          <a
            class="waves-effect waves-light btn col s6"
            @click="pushQuestCondition"
          >
            受注
          </a>
        </div>
      </div>
      <div v-if="!isConfirm">
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
              解説を読んだら、下の <br />「報酬を受け取る」
              を押してステータスを確認しよう。
            </p>
            <div class="rewardButton">
              <button
                class="btn waves-effect waves-light"
                name="action"
                @click="back"
              >
                <a>報酬を受け取る</a>
              </button>
            </div>
            <img :src="courseImg" class="courseImg center" />
          </div>
        </div>
      </div>
    </main>
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
      isCheckIn: false,
      isConfirm: false,
      documentId: null,
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        db.collection(this.$store.state.userCollection)
          .where("uid", "==", user.uid)
          .get()
          .then((snapshot) => {
            snapshot.forEach((document) => {
              this.isCheckIn = document.data().checkIn;
            });
          });
        db.collection(this.$store.state.statusCollection)
          .where("uid", "==", user.uid)
          .get()
          .then((snapshot) => {
            snapshot.forEach((document) => {
              this.questActiveList = document.data().questActiveList;
              this.documentId = document.id;
              if (this.questActiveList[this.courseId]["status"] == "inactive") {
                this.isConfirm = true;
              }
            });
          });
      }
    });
  },

  methods: {
    cancelQuest() {
      this.$router.push({ name: "PostQuest" });
    },
    pushQuestCondition() {
      switch (this.questActiveList[this.courseId]["status"]) {
        case "inactive":
          this.questActiveList[this.courseId]["status"] = "active";
          db.collection(this.$store.state.statusCollection)
            .doc(this.documentId)
            .update({
              questActiveList: this.questActiveList,
            });
          this.writeLog();
          this.$router.push({ name: "PostQuest" });
          break;
        case "active":
          break;
        case "cleared":
          this.$router.push({ name: "PostQuest" });
          break;
        default:
          break;
      }
    },
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
      let place = this.courseId + "/" + this.isCheckIn;
      db.collection(this.$store.state.accesslogCollection).add({
        date: now,
        place: place,
        answer: "問題QRコード読み込み",
        uid: this.user.uid,
      });
    },
    back() {
      if (!this.isClick) {
        let place = this.courseId + "/" + this.isCheckIn;
        if (this.isCorrect) {
          this.$router.push({
            name: "Loading",
            params: {
              status: this.rewards,
              place: place,
              answer: "問題解答",
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
  },
};
</script>

<style>
.cancel {
  background-color: white;
  color: black;
}
.confirm {
  padding-top: 50px;
}
.questTitle1 {
  font-size: 20px;
  line-height: 1.5;
}
.questTitle2 {
  font-size: 18px;
  line-height: 1;
}
.message {
  font-size: 15px;
  margin-top: 50px;
}
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

.btn a {
  color: white;
  text-align: center;
  margin: 20px;
}
footer {
  z-index: 99;
}
</style>
